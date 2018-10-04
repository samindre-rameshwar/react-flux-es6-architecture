"use strict";
var React = require('react');

var Router = require('react-router');
var routes = require('./routes');

var InitializeActions = require('./actions/initializeActions');
InitializeActions.initApp();

// pass Router.HistoryLocation as second params to change # url to html5 history location
Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('app'));
})
