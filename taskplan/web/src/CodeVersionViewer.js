import React from 'react';
import ReassuringPrompt from "./ReassuringPrompt";
class CodeVersionViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            commit_id: null,
            open: false,
            label: "",
            data: null
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onIdChange = this.onIdChange.bind(this);

        this.reassuringHardResetPromptRef = React.createRef();
        this.reassuringSoftResetPromptRef = React.createRef();
    }

    open(commit_id) {
        this.setState({
            commit_id: commit_id,
            open: true,
            data: null
        }, () => this.load());
    }

    close() {
        this.setState({
            open: false
        });
    }

    onLabelChange(event) {
        this.setState({
            label: event.target.value
        }, () => this.updateLabel());
    }

    onIdChange(event) {
        this.setState({
            commit_id: event.target.value
        }, this.state.commit_id !== event.target.value ? () => this.load() : null);
    }

    load() {
        fetch("/fetch_code_version/" + this.state.commit_id)
        .then(res => res.json())
        .then(
            (result) => {
                if (result !== null)
                    result.date = new Date(result.date * 1000);
                this.setState({
                    data: result,
                    label: result !== null ? result.label : null
                });
            },
            (error) => {

            }
        );
    }

    updateLabel() {
        fetch("/set_version_label/" + this.state.commit_id + "/" + this.state.label)
        .then(res => res.json())
        .then(
            (result) => {
                this.props.updateView();
            },
            (error) => {

            }
        );
    }


    render() {
        if (this.state.open) {
            return (
                <div className="code-version-viewer slide-editor editor" >
                    <div className="header">Code version<i class="fas fa-times" onClick={this.close}></i></div>
                        <div className="metadata">
                             <div><input value={this.state.commit_id} onChange={this.onIdChange} required="required" style={{"width": "100%"}} /></div>
                        {this.state.data !== null &&
                            <React.Fragment>
                                <div><span>Message:</span> {this.state.data.message}</div>
                                <div><span>Date:</span> {this.state.data.date.toShortStr()}</div>
                                <div onClick={this.state.data.parent !== null ? () => this.open(this.state.data.parent) : null} style={this.state.data.parent !== null ? {"cursor": "pointer"} : {}}><span>Parent:</span> {this.state.data.parent === null ? "-" : this.state.data.parent}</div>
                                <div><span>Label:</span>  <input placeholder={this.state.data.inherited_label} value={this.state.label} onChange={this.onLabelChange} /></div>
                            </React.Fragment>
                        }
                        </div>

                    <div className="buttons">
                        <div onClick={() => this.reassuringHardResetPromptRef.current.openDialog()} title="Do a git hard reset. This will reset all files to the state of this commit.">Hard reset</div>
                        <div onClick={() => this.reassuringSoftResetPromptRef.current.openDialog()} title="Do a git soft reset. This will leave all files as they are now but will set the HEAD to this commit.">Soft reset</div>
                    </div>

                    <ReassuringPrompt ref={this.reassuringHardResetPromptRef} header="Really want to do a hard reset?" text="Do you really want to do a hard reset? This will move HEAD to this commit and reset all code to its state." url={"/hard_reset/" + this.state.commit_id}/>
                    <ReassuringPrompt ref={this.reassuringSoftResetPromptRef} header="Really want to do a soft reset?" text="Do you really want to do a soft reset? This will move HEAD to this commit, but keeps the changes." url={"/soft_reset/" + this.state.commit_id}/>
                </div>
            );
        } else {
            return "";
        }
    }
}

export default CodeVersionViewer;