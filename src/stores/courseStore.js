"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionType = require('../constants/actionsType');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');

var _courses = [];

var CourseStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getAllCourses: function () {
        return _courses;
    },
    getCourseById: function (id) {
        return _.find(_courses, { id: id });
    }
});

function replaceAuthor(action) {
    var existingCourse = _.find(_courses, { id: action.course.id });
    var existingAuthorIndex = _.indexOf(_courses, existingCourse);
    _courses.splice(existingAuthorIndex, 1, action.course);
};

Dispatcher.register(function (action) {
    switch (action.actionType) {

        case ActionType.INITIALIZE:
            _courses = action.initialData.courses;
            CourseStore.emitChange();
            break;

        case ActionType.CREATE_COURSE:
            _courses.push(action.course);
            CourseStore.emitChange();
            break;

        case ActionType.UPDATE_COURSE:
            replaceAuthor(action);
            CourseStore.emitChange();
            break;

        case ActionType.DELETE_COURSE:
            _.remove(_courses, function (course) {
                return action.id === course.id;
            });
            CourseStore.emitChange();
            break;
        default:
        //no op
    };
});

module.exports = CourseStore;