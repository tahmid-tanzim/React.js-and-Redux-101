var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Whoops404 = React.createClass({
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
});

module.exports = Whoops404;