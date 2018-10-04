"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionType = require('../constants/actionsType');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');

var _authors = [];

var AuthorStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getAllAuthors: function () {
        return _authors;
    },

    getAuthorsById: function (id) {
        return _.find(_authors, { id: id });
    }
});

function replaceAuthor(action) {
    var existingAuthor = _.find(_authors, { id: action.author.id });
    var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
    _authors.splice(existingAuthorIndex, 1, action.author);
};

Dispatcher.register(function (action) {
    switch (action.actionType) {

        case ActionType.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;

        case ActionType.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;

        case ActionType.UPDATE_AUTHOR:
            replaceAuthor(action);
            AuthorStore.emitChange();
            break;

        case ActionType.DELETE_AUTHOR:
            _.remove(_authors, function (author) {
                return action.id === author.id;
            });
            AuthorStore.emitChange();
            break;
        default:
        //no op
    };
});

module.exports = AuthorStore;