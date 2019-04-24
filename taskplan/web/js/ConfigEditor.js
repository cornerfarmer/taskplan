import React from 'react';
import Prompt from "./Prompt";
import JsonEditor from './JsonEditor';

class ConfigEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {},
            inheritedConfig: {},
            loadedUrl: ''
        };

        this.jsonEditor = React.createRef();
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
                inheritedConfig: {},
                loadedUrl: this.props.url
            });
            this.jsonEditor.current.updateEditor();
        } else if (this.state.loadedUrl !== this.props.url) {
            fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        inheritedConfig: result['inherited_config'],
                        config: result['config'] !== null ? result['config'] : this.state.config,
                        loadedUrl: this.props.url
                    });
                    this.jsonEditor.current.updateEditor();

                    if (this.props.onDynamicChange !== undefined)
                        this.props.onDynamicChange(result['dynamic'])
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

    render() {
        if (this.state.loadedUrl === this.props.url)
            return (
                <JsonEditor ref={this.jsonEditor} json={this.state.config} inheritedJson={this.state.inheritedConfig} onChange={this.onChange}/>
            );
        else
            return (
                <div className="editor-loading"><i className="fas fa-sync fa-spin fa-2x"></i></div>
            )
    }
}

export default ConfigEditor;