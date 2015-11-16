var React = require('react');
var Display = require('./parts/Display');
var Join = require('./parts/Join');
var Audience = React.createClass({
    render() {
        return (
            <div>
                <Display if={this.props.status === 'connected'}>
                    <Display if={this.props.member.name}>
                        <h2>Welcome {this.props.member.name}</h2>
                        <Display if={!this.props.currentQuestion}>
                            <p>{this.props.audience.length} audience members connected.</p>
                            <p>Questions will appear here.</p>
                        </Display>
                        <Display if={this.props.currentQuestion}>
                            <h3>{this.props.currentQuestion.q}</h3>
                        </Display>
                    </Display>
                    <Display if={!this.props.member.name}>
                        <h2>Join the session</h2>
                        <Join emit={this.props.emit} />
                    </Display>
                </Display>
            </div>
        );
    }
});

module.exports = Audience;