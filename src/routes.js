"use strict";

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/homePage')}></DefaultRoute>
        <Route name="authors" handler={require('./components/authors/authorPage')}></Route>
        <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')}></Route>
        <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')}></Route>
        <Route name="courses" handler={require('./components/courses/coursePage')}></Route>
        <Route name="addCourse" path="course" handler={require('./components/courses/manageCoursePage')}></Route>
        <Route name="manageCourse" path="course/:id" handler={require('./components/courses/manageCoursePage')}></Route>
        <Route name="about" handler={require('./components/about/aboutPage')}></Route>
        <NotFoundRoute handler={require('./components/notFoundPage')}></NotFoundRoute>
        <Redirect from="about-us" to="about"></Redirect>
        <Redirect from="awthurs" to="authors"></Redirect>
        <Redirect from="about/*" to="about"></Redirect>
    </Route>
);

module.exports = routes;
