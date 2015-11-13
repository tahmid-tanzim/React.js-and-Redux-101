var React = require('react');
var Link = require('react-router').Link;

var Join = React.createClass({
    join() {
        var member = {
            name: React.findDOMNode(this.refs.name).value
        };
        console.log("TODO: Join Member " + member.name);
        /**
         * 1. Sending memberName to server by emitting `join` event.
         * 2. `this.props.emit` is actually invoking `emit` function from `./components/APP.js`
         * */
        this.props.emit('join', member);
    },
    render() {
        return (
            <form action="javascript:void(0)" onSubmit={this.join}>
                <label>Full Name</label>
                <input ref="name"
                       className="form-control"
                       placeholder="enter your full name"
                       required/>
                <button className="btn btn-primary">Join</button>
                <Link to="/speaker">Join as speaker</Link>
            </form>
        );
    }
});

module.exports = Join;