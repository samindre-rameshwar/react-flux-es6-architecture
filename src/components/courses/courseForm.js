"use strict";
var React = require('react');
var TextInput = require('../common/textInput');
var SelectInput = require('../common/selectInput');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        handleChange: React.PropTypes.func.isRequired,
        handleSelectChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object,
        options: React.PropTypes.array.isRequired
    },
    componentWillMount: function () {
        // console.log(this.props.options)
    },

    render: function () {
        return (
            <form>
                <h2>Manage Course</h2>
                <TextInput name="title" label="Title" value={this.props.course.title}
                    onChange={this.props.handleChange} error={this.props.errors.title} />

                <SelectInput name="author" label="Author" value={this.props.course.author}
                    onChange={this.props.handleSelectChange} error={this.props.errors.author}
                    options={this.props.options} />

                <TextInput name="category" label="Category" value={this.props.course.category}
                    onChange={this.props.handleChange} error={this.props.errors.category} />

                <TextInput name="length" label="Length" value={this.props.course.length}
                    onChange={this.props.handleChange} error={this.props.errors.length} />

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form >
        );
    }
});

module.exports = CourseForm;