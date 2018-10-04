"use strict";
var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function () {
        return {
            author: { id: '', firstName: '', lastName: '' },
            errors: {},
            dirty: false
        }
    },

    componentWillMount: function () {
        var authorId = this.props.params.id;  //from the path '/author:id'

        if (authorId) {
            this.setState({ author: AuthorStore.getAuthorsById(authorId) });
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
    setAuthorState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({ author: this.state.author });
    },

    authorFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; //clear any prev errors

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = "First Name must be atleast 3 characters.";
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = "Last Name must be atleast 3 characters.";
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors });
        return formIsValid;
    },

    saveAuthor: function (event) {
        event.preventDefault();
        if (!this.authorFormIsValid()) {
            return;
        };
        // AuthorApi.saveAuthor(this.state.author);

        if (this.state.author.id) {
            AuthorActions.updateAuthor(this.state.author);
        } else {
            AuthorActions.createAuthor(this.state.author);
        }
        this.setState({ dirty: false });
        toastr.success('Author Saved!');
        this.transitionTo('authors');
    },

    render: function () {
        return (
            <div>
                <AuthorForm author={this.state.author}
                    handleChange={this.setAuthorState} onSave={this.saveAuthor}
                    errors={this.state.errors} />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;