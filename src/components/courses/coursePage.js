"use strict";

var React = require('react');
var Link = require('react-router').Link;
var CourseStore = require('../../stores/courseStore');
var CourseList = require('./courseList');


var CoursePage = React.createClass({
    getInitialState: function () {
        return {
            courses: CourseStore.getAllCourses()
        }
    },
    componentWillMount: function () {
        CourseStore.addChangeListener(this._onChange);
    },

    //clean up when this component is unmounted
    componentWillUnmount: function () {
        CourseStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ authors: CourseStore.getAllCourses() })
    },
    render: function () {
        return (
            <div>
                <h1>Course</h1>
                <Link to="addCourse" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses} />
            </div>
        );
    }
})

module.exports = CoursePage;