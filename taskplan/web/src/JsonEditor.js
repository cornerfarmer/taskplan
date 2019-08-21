import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import JSONEditor from 'jsoneditor';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
var stringify = require('json-stable-stringify');

var Node = require('jsoneditor/src/js/Node');

var originalUpdateDom = Node.prototype.updateDom;
Node.prototype.updateDom = function (options) {
    originalUpdateDom.call(this, options);
    var tdRevert = this.dom.tdRevert;
    if (!tdRevert && this.dom && this.dom.tr && this.fieldEditable && (this.type === "auto" || this.type === "array" || this.type === "string")) {
        tdRevert = document.createElement('td');
        this.dom.tdRevert = tdRevert;
        this.dom.tdValue.parentNode.appendChild(tdRevert);

        var icon = document.createElement('i');
        icon.type = 'i';
        icon.className = 'fas fa-undo-alt';

        var button = document.createElement('div');
        button.type = 'div';
        button.className = 'revert';
        button.onclick = () => {
            this.editor.options.onRevert({path: this.getPath(), field: this.field, value: this.value})
        };
        button.appendChild(icon);


        tdRevert.appendChild(button);
    }

};

JSONEditor.VALID_OPTIONS.push('onRevert');
console.log(Node);


class JsonEditor extends React.Component {
    componentDidMount() {
        const options = {};
        options.onModeChange = (mode) => {
            this.updateEditor();
            if (mode === "tree")
                this.jsoneditor.expandAll();
        };
        options.onClassName = (node) => {

            if (this.pathExistsInJson(node.path, this.props.inheritedJson) && !this.pathExistsInJson(node.path, this.props.json)) {
                return 'inherited-value';
            } else if (!this.pathExistsInJson(node.path, this.props.inheritedJson) && this.pathExistsInJson(node.path, this.props.json)) {
                return 'new-value';
            }

            return undefined;
        };
        options.onEditable = (node) => {

            if (this.pathExistsInJson(node.path, this.props.inheritedJson) ) {
                return {"field": false, "value": true};
            } else {
                return {"field": true, "value": true};
            }

        };
        options.onChange = () => {
            if (this.jsoneditor.getMode() === "code") {
                try {
                    const currentJson = this.jsoneditor.get();
                    if (this.props.json !== currentJson) {
                        this.props.onChange(currentJson);
                    }
                } catch (err) {
                    this.err = err;
                }
            }
        };
        options.onChangeJSON = (json) => {
            if (this.jsoneditor.getMode() === "tree") {
                var newJson = {};
                this.updateFromJsonEditor(newJson, this.props.json, this.props.inheritedJson, json, []);
                this.props.onChange(newJson);
                console.log(newJson);
            }
        };
        options.onRevert = (node) => {
            var newJson = cloneDeep(this.props.json);
            var currentBlock = newJson;
            var prevBlocks = [newJson];

            for (var i = 0; i < node.path.length; i++) {
                if (i === node.path.length - 1) {
                    delete currentBlock[node.path[i]];
                } else {
                    currentBlock = currentBlock[node.path[i]];
                    prevBlocks.push(currentBlock)
                }
            }

            for (var i = node.path.length - 2; i >= 0; i--) {
                if (isEmpty(prevBlocks[i][node.path[i]])) {
                    delete prevBlocks[i][node.path[i]];
                } else {
                    break;
                }
            }

            this.props.onChange(newJson);
            this.updateEditor();
        };
        options.mode = 'mode' in this.props.options ? this.props.options.mode : 'tree';
        options.modes = 'modes' in this.props.options ? this.props.options.modes : ['code', 'tree'];
        options.ace = ace;
        options.history = false;
        options.enableSort = false;
        options.enableTransform = false;
        options.mainMenuBar = 'mainMenuBar' in this.props.options ? this.props.options.mainMenuBar : true;
        options.statusBar = 'statusBar' in this.props.options ? this.props.options.statusBar : true;

        this.jsoneditor = new JSONEditor(this.container, options);

        if ('readOnly' in this.props.options && this.props.options.readOnly) {
            this.jsoneditor.aceEditor.setReadOnly(true);
        }

        if ('json' in this.props) {
            this.updateEditor();
            if (options.mode === 'tree')
                this.jsoneditor.expandAll();
        }
    }

    updateFromJsonEditor(newJson, oldJson, inheritedJson, editorJson, path) {
        for (var prop in editorJson) {
            if (typeof editorJson[prop] === "object" && !Array.isArray(editorJson[prop]) && Object.keys(editorJson[prop]).length > 0) {
                this.updateFromJsonEditor(
                    newJson,
                    prop in oldJson ? oldJson[prop] : {},
                    prop in inheritedJson ? inheritedJson[prop] : {},
                    editorJson[prop],
                    path.concat([prop])
                );
            } else {
                if ((prop in inheritedJson && !isEqual(inheritedJson[prop], editorJson[prop])) || !(prop in inheritedJson) || prop in oldJson) {
                    this.setValueAtPath(newJson, path.concat([prop]), editorJson[prop]);
                }
            }
        }
    }

    pathExistsInJson(path, json) {
        if (!path) {
            return false;
        }

        var currentBlock = json;
        for (var i = 0; i < path.length; i++) {
            if (i === path.length - 1) {
                return path[i] in currentBlock;
            } else {
                if (!(path[i] in currentBlock)) {
                    return false;
                }
                currentBlock = currentBlock[path[i]];
            }
        }
        return false;
    }

    setValueAtPath(json, path, value) {
        var currentBlock = json;
        for (var i = 0; i < path.length; i++) {
            if (i === path.length - 1) {
                currentBlock[path[i]] = value;
            } else {
                if (!(path[i] in currentBlock)) {
                    currentBlock[path[i]] = {};
                }
                currentBlock = currentBlock[path[i]];
            }
        }
    }

    componentDidUpdate() {
    }

    updateEditor() {
        if (this.jsoneditor.getMode() === "code") {
            this.jsoneditor.setText(stringify(this.props.json, { space: '  ' }));
        } else {
            var mergedJson = cloneDeep(this.props.inheritedJson);
            merge(mergedJson, this.props.json);
            this.jsoneditor.setText(stringify(mergedJson, { space: '  ' }));
        }
    }

    componentWillUnmount() {
        if (this.jsoneditor) {
            this.jsoneditor.destroy();
        }
    }

    render() {
        return (
            <div className={"jsoneditor-react-container" + ('readOnly' in this.props.options && this.props.options.readOnly ? ' jsoneditor-readOnly' : '')} ref={elem => this.container = elem}/>
        );
    }
}

export default JsonEditor;