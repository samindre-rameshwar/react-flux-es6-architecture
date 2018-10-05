"use strict";
var React = require('react');
var Link = require('react-router').Link;
var AuthorActions = require('../../actions/authorActions');
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');
var AuthorList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },

    deleteCourse: function (id, event) {
        event.preventDefault();
        CourseActions.deleteCourse(id);
        toastr.success('Author Deleted!')
    },
    render: function () {

        var createAuthorRow = function (course) {
            return (
                <tr key={course.id}>
                    <td><Link to="manageCourse" params={{ id: course.id }}>{course.title}</Link></td>
                    <td>{course.author.name}</td>
                    <td>{course.category}</td>
                    <td>{course.length}</td>
                    <td><a href={course.watchHref}>Watch</a></td>
                    <td><a href="#" onClick={this.deleteCourse.bind(this, course.id)}>Delete</a></td>
                </tr>
            );
        };
        return (
            <div>
                <table className="table">
                    <thead>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Length</th>
                        <th>Watch</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {this.props.courses.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
})

module.exports = AuthorList;