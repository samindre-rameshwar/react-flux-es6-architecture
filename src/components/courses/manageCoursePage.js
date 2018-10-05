"use strict";
var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var AuthorStore = require('../../stores/authorStore');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');
var _ = require('lodash');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function () {
        var authorList = AuthorStore.getAllAuthors();
        authorList.forEach(function (item) {
            item.name = item.firstName + ' ' + item.lastName;
        })
        return {
            course: {
                id: '', title: '', author: authorList[1], category: '', length: '',
                watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet"
            },
            errors: {},
            dirty: false,
            author: authorList
        }
    },
    componentWillMount: function () {
        var courseId = this.props.params.id;  //from the path '/course:id'

        if (courseId) {
            this.setState({ course: CourseStore.getCourseById(courseId) });
        }
    },
    statics: {
        // willTransitionTo: function (transition, params, query, callback) {
        //     if (!confirm('Are you sure you read a page that\'s this boring?')) {
        //         transition.abort();
        //     } else {
        //         callback();
        //     }
        // },
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave withput saving?')) {
                transition.abort();
            }
        }
    },
    setCourseState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;
        this.state.course[field] = value;
        return this.setState({ course: this.state.course });
    },

    courseFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; //clear any prev errors

        if (this.state.course.title.length < 3) {
            this.state.errors.title = "Title Name must be atleast 3 characters.";
            formIsValid = false;
        }

        if (this.state.course.category.length < 3) {
            this.state.errors.category = "Category Name must be atleast 3 characters.";
            formIsValid = false;
        }

        if (!this.state.course.length) {
            this.state.errors.length = "Length is required.";
            formIsValid = false;
        }

        if (!this.state.author.length) {
            this.state.errors.author = "Author is required.";
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors });
        return formIsValid;
    },

    saveCourse: function (event) {
        event.preventDefault();
        if (!this.courseFormIsValid()) {
            return;
        };

        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }
        this.setState({ dirty: false });
        toastr.success('Course Saved!');
        this.transitionTo('courses');
    },

    setDropDownState: function (e) {
        var temp = this.state.course
        temp.author = this.state.author[e.target.value];
        this.setState({ temp })
    },
    render: function () {
        return (
            <div>
                <CourseForm course={this.state.course}
                    handleChange={this.setCourseState} handleSelectChange={this.setDropDownState} onSave={this.saveCourse}
                    errors={this.state.errors} options={this.state.author} />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;