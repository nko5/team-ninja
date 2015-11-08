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
    tickets: [{
        board: Array,
        used: Boolean,
        userId: { type: Schema.Types.ObjectId, ref: 'User'}
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
        identifier: String,
        wonBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    info: String,
    active: Boolean
});

GameSchema.methods = {
    hasPlayer: function (user) {
        var user;

        for (var i = 0; i < this.players.length; i++) {
            if ([this.players[i].id == user._id]) {
                return true;
            }
        }
        return false;
    }
};
module.exports = mongoose.model('Game', GameSchema);