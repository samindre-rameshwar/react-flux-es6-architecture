"use strict";
var React = require('react');
var TextInput = require('../common/textInput');

var AuthorForm = React.createClass({
    propTypes: {
        author: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function () {
        return (
            <form>
                <h2>Manage Author</h2>
                <TextInput name="firstName" label="First Name" value={this.props.author.firstName}
                    onChange={this.props.handleChange} error={this.props.errors.firstName} />

                <TextInput name="lastName" label="Last Name" value={this.props.author.lastName}
                    onChange={this.props.handleChange} error={this.props.errors.lastName} />

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form >
        );
    }
});

module.exports = AuthorForm;