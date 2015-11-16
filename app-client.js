/**
 * Note: ES6 syntax conversion
 * From: var React = required('react');
 * To: import React from 'react'
 * */
import React from 'react'
import Router from 'react-router'
import APP from './components/APP'
import Audience from './components/Audience'
import Speaker from './components/Speaker'
import Board from './components/Board'
import Whoops404 from './components/Whoops404'

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRouter = Router.NotFoundRoute;
/**
 * Note: ES6 De-structuring assignment above comment out components.
 * */
//var { Route, DefaultRoute, NotFoundRouter } = Router;

var routes = (
    <Route handler={APP}>
        <DefaultRoute handler={Audience} />
        <Route name="audience" path="audience" handler={Audience}></Route>
        <Route name="speaker" path="speaker" handler={Speaker}></Route>
        <Route name="board" path="board" handler={Board}></Route>
        <NotFoundRouter handler={Whoops404} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('react-container'));
});
