import React from 'react';


class FlashMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 0
        };
    }

    render() {
        let style = {};
        if (this.state.state === 0)
            style = {marginLeft: -400};
        else if (this.state.state === 1)
            style = {marginLeft: 0};
        else if (this.state.state === 2)
            style = {marginLeft: 0, marginTop: -26};
        return (
            <div className={'flash-message level-' + this.props.flashMessage.level} style={style} title={this.props.flashMessage.message}>
                {this.props.flashMessage.short}
            </div>
        );
    }
}

class FlashMessageManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flashMessages: []
        };
        this.flashMessagesRefs = [];
        this.nextId = 0;

        var fm = this;
        this.props.evtSource.addEventListener("FLASH_MESSAGE", function (e) {
            const flashMessages = fm.state.flashMessages.slice();
            const newFlashMessage = JSON.parse(e.data);

            newFlashMessage.id = fm.nextId++;

            flashMessages.push(newFlashMessage);
            fm.flashMessagesRefs.push(React.createRef());
            let flashMessageRef = fm.flashMessagesRefs[fm.flashMessagesRefs.length - 1];
            setTimeout(() => fm.nextState(flashMessageRef), 100);

            fm.setState({
                flashMessages: flashMessages
            });
        });
    }

    nextState(flashMessage) {
        if (flashMessage.current.state.state === 0) {
            flashMessage.current.setState({state: 1});
            setTimeout(() => this.nextState(flashMessage), 10000);
        } else if (flashMessage.current.state.state === 1) {
            flashMessage.current.setState({state: 2});
            setTimeout(() => this.nextState(flashMessage), 1000);
        } else if (flashMessage.current.state.state === 2) {
            const flashMessages = this.state.flashMessages.slice();
            const messageIndex = this.flashMessagesRefs.findIndex(function (e) {
                return e === flashMessage
            });

            flashMessages.splice(messageIndex, 1);
            this.flashMessagesRefs.splice(messageIndex, 1);

            this.setState({
                flashMessages: flashMessages
            });
        }
    }

    render() {
        return (
            <div id="flash-messages">
                {this.state.flashMessages.map((flashMessage, index) => (
                    <FlashMessage
                        key={flashMessage.id}
                        flashMessage={flashMessage}
                        ref={this.flashMessagesRefs[index]}
                    />
                ))}
            </div>
        );
    }
}


export default FlashMessageManager;