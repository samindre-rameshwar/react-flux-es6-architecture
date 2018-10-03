"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
    render: function () {
        return (
            <div className="jumbotron">
                <h2>PluralSight Admin</h2>
                <p>React,React,Router and Flux</p>
                <Link to="about" className="btn btn-primary btn-sm">Learn More</Link>
            </div>
        );
    }
})

module.exports = Home;