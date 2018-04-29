class

class ProjectManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

        var evtSource = new EventSource("/update");
        var pm = this;

        evtSource.addEventListener("TASK_CHANGED", function(e) {
            console.log(e.data);
            pm.setState({
                isLoaded: true,
                items: [e.data]
            });
        });
    }

    componentDidMount() {


        /*
        fetch("http://127.0.0.1:5000/list_presets/TestTask")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.presets
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )*/
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li>
                            {item}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}


function App() {
    return (
        <div>
            <ProjectManager name="Sara"/>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

