import React from 'react'
import Display from './parts/Display'
import ReactD3 from 'react-d3'
var {BarChart} = ReactD3;

var Board = React.createClass({
    barGraphData(results) {
        return Object.keys(results).map(function(choice){
            return {
                label: choice,
                value: results[choice]
            };
        });
    },
    render() {
        return (
            <div id="scoreboard">
                <Display if={this.props.status === 'connected' && this.props.currentQuestion}>
                    <BarChart data={this.barGraphData(this.props.results)}
                              title={this.props.currentQuestion.q}
                              height={window.innerHeight * 0.6}
                              width={window.innerWidth * 0.9} />
                </Display>
                <Display if={this.props.status === 'connected' && !this.props.currentQuestion}>
                    <h3>Awaiting a Question...</h3>
                </Display>
            </div>
        );
    }
});

module.exports = Board;