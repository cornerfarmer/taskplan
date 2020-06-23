import React from 'react';
import Autocomplete from 'react-autocomplete';

class TagsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.onKeyDown = this.onKeyDown.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.remove = this.remove.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.autocompleteRef = React.createRef();
    }

    updateValue(value) {
        this.setState({
            value: value
        });
        this.autocompleteRef.current.setState({
            highlightedIndex: null
        });
    }

    onSelect(value) {
        this.setState({
            value: value
        },
        () => this.add());
    }

    onKeyDown(e) {
        if (e.keyCode === 13 && this.autocompleteRef.current.state.highlightedIndex === null) {
            e.preventDefault();
            this.add();
        }
    }

    add() {
         if (this.state.value === "")
            return;

         let tags = this.props.tags.slice();

         tags.push(this.state.value);
         this.props.updateTags(tags);

         this.setState({
            value: ""
        });
    }

    remove(value) {
         let tags = this.props.tags.slice();
         tags.splice(tags.indexOf(value), 1);
         this.props.updateTags(tags);
    }

    componentDidMount() {
        this.autocompleteRef.current.highlightItemFromMouse = (item) => {};
    }

    selectableValues() {
        let values = this.props.allTags.slice();

        for (let tag of this.props.tags) {
            var index = values.indexOf(tag);
            if (index !== -1)
                values.splice(index, 1);
        }
        return values;
    }

    render() {
        return (
            <div   className="tags-edit">
            <div>
                {this.props.tags.map(value => (
                    <span key={value} className="value"><span>{value}</span><i className="fas fa-times" onClick={() => this.remove(value)}></i></span>
                ))}
                <Autocomplete
                    ref={this.autocompleteRef}
                    autoHighlight={false}
                    shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={(item) => item}
                    items={this.selectableValues()}
                    renderItem={(item, isHighlighted) =>
                        <div className={isHighlighted ? 'autocomplete-hover' : ''} style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                            {item}
                        </div>
                    }
                    value={this.state.value}
                    onChange={evt => this.updateValue(evt.target.value)}
                    inputProps={{
                        'onKeyDown': this.onKeyDown
                    }}
                    onSelect={(val) => this.onSelect(val)}
                    wrapperStyle={{ position: 'relative' }}
                    menuStyle={{ position: 'absolute', top: '35px', left: 0 }}
                />

            </div>
            </div>
        );
    }
}

export default TagsEdit;