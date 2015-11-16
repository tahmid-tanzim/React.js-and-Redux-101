var React = require('react');

var Ask = React.createClass({
    getInitialState() {
        return {
            choices: []
        };
    },
    componentWillMount() {
        this.setUpChoices();
    },
    componentWillReceiveProps() {
        this.setUpChoices();
    },
    setUpChoices() {
        var choices = Object.keys(this.props.question);
        /* Discard the question from array. */
        choices.shift();
        this.setState({choices: choices});
    },
    addChoiceButton(choice, i) {
        var buttonTypes = ['success', 'info', 'warning', 'danger', 'primary', 'default'];
        return(
            <button key={i} className={"col-xs-12 col-sm-6 btn btn-" + buttonTypes[i]}>
                {choice}: {this.props.question[choice]}
            </button>
        );
    },
    render() {
        return (
            <div id="currentQuestion">
                <h3>{this.props.question.q}</h3>
                <div className="row">
                    {this.state.choices.map(this.addChoiceButton)}
                </div>
            </div>
        );
    }
});

module.exports = Ask;