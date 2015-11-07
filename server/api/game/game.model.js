'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
    name: String,
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dateCreated: {type: Number, default: Date.now},
    lastUpdated: {type: Number, default: Date.now},
    dateStarted: {type: Number, default: Date.now},
    dateEnded: {type: Number, default: Date.now},
    calledNumbers: Array,
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