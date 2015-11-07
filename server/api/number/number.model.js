'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NumberSchema = new Schema({
    number: Number,
    dateCreated: {type: Number, default: Date.now},
    lastUpdated: {type: Number, default: Date.now},
    description: String
});

module.exports = mongoose.model('Number', NumberSchema);