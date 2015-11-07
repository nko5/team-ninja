'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
    host: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        picture: String
    },
    players: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        picture: String
    }],
    dateCreated: {
        type: Number,
        default: Date.now
    },
    lastUpdated: {
        type: Number,
        default: Date.now
    },
    dateStarted: {
        type: Number
    },
    dateEnded: {
        type: Number
    },
    calledNumbers: {
        type: Array,
        default: []
    },
    rules: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Rule'
        },
        name: String,
        wonBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    info: String,
    active: Boolean
});

module.exports = mongoose.model('Game', GameSchema);