import React from 'react';
import Prompt from "./Prompt";
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';

class ConfigEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {},
            mode: 'code',
            loadedUrl: ''
        };

        this.jsonEditor = React.createRef();
        this.onModeChange = this.onModeChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate() {
        this.reload();
    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        if (this.props.url === "" && this.state.loadedUrl !== this.props.url) {

            this.setState({
                config: {},
                loadedUrl: this.props.url
            });
            if (this.jsonEditor.current !== null)
                this.jsonEditor.current.jsonEditor.set({});
        } else if (this.state.loadedUrl !== this.props.url) {
            fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        config: result,
                        loadedUrl: this.props.url
                    });
                    if (this.jsonEditor.current !== null)
                        this.jsonEditor.current.jsonEditor.set(result);
                },
                (error) => {

                }
            )
        }
    }

    onChange(data) {
        this.setState({
            config: data
        });
    }

    onModeChange(mode) {
        this.setState({
            mode: mode
        });
    }

    render() {
        if (this.state.loadedUrl === this.props.url)
            return (
                <Editor ref={this.jsonEditor} mode={this.state.mode} allowedModes={['code', 'tree']} value={this.state.config} onModeChange={this.onModeChange} onChange={this.onChange} ace={ace} history={true}/>
            );
        else
            return (
                <div className="editor-loading"><i className="fas fa-sync fa-spin fa-2x"></i></div>
            )
    }
}

export default ConfigEditor;