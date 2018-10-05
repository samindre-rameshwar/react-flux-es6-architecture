"use strict";
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionType = require('../constants/actionsType');
var AuthorApi = require('../api/authorApi');
var CourseApi = require('../api/courseApi');

var InitializeActions = {
    initApp: function () {
        Dispatcher.dispatch({
            actionType: ActionType.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors(),
                courses: CourseApi.getAllCourses()
            }
        });
    }
};

module.exports = InitializeActions;