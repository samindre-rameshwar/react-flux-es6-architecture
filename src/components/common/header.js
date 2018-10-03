"use strict";
var React = require('react');
var Header = React.createClass({
    render: function () {
        return (
            <nav className="nav navbar-default" style={{ 'background': 'skyblue' }}>
                <div className="container-fluid">
                    <a href="/" className="navbar-brand" style={{ 'padding': '3px 15px' }}>
                        <img src="images/logo-new.png" />
                    </a>
                    <ul className="nav navbar-nav">
                        <li><a href="/" style={{ 'color': '#000' }}>Home</a></li>
                        <li><a href="/#authors" style={{ 'color': '#000' }}>Authors</a></li>
                        <li><a href="/#about" style={{ 'color': '#000' }}>About</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
})

module.exports = Header;