"use strict";
var React = require('react');

var SelectInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.object,
        error: React.PropTypes.string,
        options: React.PropTypes.array.isRequired
    },
    componentWillMount: function () {
        console.log(this.props.value)
    },
    render: function () {
        var wrapperClass = "form-group";
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }
        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">

                    <select name={this.props.name} className="form-control" placeholder={this.props.placeholder}
                        onChange={this.props.onChange}>
                        {this.props.options.map(function (item, index) {
                            return (
                                <option key={index} value={index}>
                                    {item.name}
                                </option>
                            )
                        }, this)}
                    </select>

                    <div className="input">{this.props.error}</div>
                </div>
            </div>
        );
    }
});

module.exports = SelectInput;