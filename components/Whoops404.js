import React from 'react'
import Router from 'react-router'
var {Link} = Router;

/**
 * Note: ES6 Class Syntax
 * FROM: var Whoops404 = React.createClass({});
 * TO: class Whoops404 extends React.Component {}
 * */
class Whoops404 extends React.Component {
    render() {
        return (
           <div id="not-found">
               <h2>Whoops...</h2>
               <p>Sorry! The page is not available. Are you looking for:</p>
               <Link to="/">Join as Audience</Link>
               <Link to="/speaker">Start the Presentation</Link>
               <Link to="/board">View the Board</Link>
           </div>
        );
    }
}

module.exports = Whoops404;