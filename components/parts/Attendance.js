import React from 'react'
import Display from './Display'

var Attendance = React.createClass({
    addMemberRow(member, i) {
        return(
            <tr key={i}>
                <td>{member.name}</td>
                <td>{member.id}</td>
            </tr>
        );
    },
    render() {
        return (
            <div>
                <Display if={this.props.audience.length > 0}>
                <h2>Attendance - {this.props.audience.length} members</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Audience Member</th>
                                <th>Socket ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.audience.map(this.addMemberRow)}
                        </tbody>
                    </table>
                </Display>
                <Display if={this.props.audience.length == 0}>
                    <div className="alert alert-danger" role="alert">
                        <strong>Sorry!</strong> We don't have any Attendance.
                    </div>
                </Display>
            </div>
        );
    }
});

module.exports = Attendance;