'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RuleSchema = new Schema({
    name: String,
    description: String,
    identifier: String,
    dateCreated: {
        type: Number,
        default: Date.now
    },
    lastUpdated: {
        type: Number,
        default: Date.now
    },
    active: Boolean
});

module.exports = mongoose.model('Rule', RuleSchema);