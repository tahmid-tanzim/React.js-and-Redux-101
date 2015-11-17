import React from 'react'
/**
 * Note: ES6 Class & Properties Syntax
 * FROM: var Header = React.createClass({});
 * TO: class Header extends React.Component {}
 * */
class Header extends React.Component {
    render() {
        return (
            <header className="row">
                <div className="col-xs-10">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.speaker}</p>
                </div>
                <div className="col-xs-2">
                    <span id="connection-status" className={this.props.status}></span>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired
};

Header.defaultProps = {
    status: 'disconnected'
};

module.exports = Header;