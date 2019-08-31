import React from 'react';
import JsonEditor from './JsonEditor';

class ConfigEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {},
            inheritedConfig: {},
            loadedUrl: null,
            dataJsonString: ''
        };

        this.jsonEditor = React.createRef();
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.url !== this.props.url || JSON.stringify(prevProps.bases) !== JSON.stringify(this.props.bases))
            this.reload();
    }

    componentDidMount() {
        this.setState({
            loadedUrl: null
        });
        this.reload();
    }

    reload() {
        if (this.props.url === "") {

            if (this.state.loadedUrl !== this.props.url) {
                this.setState({
                    config: {},
                    inheritedConfig: {},
                    loadedUrl: this.props.url
                });
                if (this.jsonEditor.current !== null)
                    this.jsonEditor.current.updateEditor();
            }
        } else {
            var dataJson = {};
            dataJson['bases'] = this.props.bases;
            let dataJsonString = JSON.stringify(dataJson);
            if (this.state.loadedUrl !== this.props.url || this.state.dataJsonString !== dataJsonString) {
                var data = new FormData();

                data.append("data", dataJsonString);

                fetch(this.props.url,
                    {
                        method: "POST",
                        body: data
                    })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                inheritedConfig: result['inherited_config'],
                                config: result['config'] !== null ? result['config'] : this.state.config,
                                loadedUrl: this.props.url,
                                dataJsonString: dataJsonString
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
    }

    onChange(data) {
        this.setState({
            config: data
        });
    }

    render() {
        if (this.state.loadedUrl === this.props.url)
            return (
                <JsonEditor ref={this.jsonEditor} json={this.state.config} inheritedJson={this.state.inheritedConfig} onChange={this.onChange} options={this.props.preview ? {mode: 'code', modes: ['code'], readOnly: true, mainMenuBar: false, statusBar: false} : {}} />
            );
        else
            return (
                <div className="editor-loading"><i className="fas fa-sync fa-spin fa-2x"></i></div>
            )
    }
}

export default ConfigEditor;