"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function () {
        return (
            <nav className="nav navbar-default" style={{ 'background': 'skyblue' }}>
                <div className="container-fluid">
                    <Link to="app" className="navbar-brand" style={{ 'padding': '3px 15px' }}>
                        <img src="images/logo-new.png" />
                    </Link>
                    <ul className="nav navbar-nav">
                        <li><Link to="app" style={{ 'color': '#000' }}>Home</Link></li>
                        <li><Link to="authors" style={{ 'color': '#000' }}>Authors</Link></li>
                        <li><Link to="courses" style={{ 'color': '#000' }}>Courses</Link></li>
                        <li><Link to="about" style={{ 'color': '#000' }}>About</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;