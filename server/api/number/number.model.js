'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var writtenNumber = require('written-number');

var NumberSchema = new Schema({
    number: Number,
    dateCreated: {type: Number, default: Date.now},
    lastUpdated: {type: Number, default: Date.now},
    description: String
});
NumberSchema.methods = {
    inWords: function (language) {
        return writtenNumber(this.number, {lang: language});
    }
};


module.exports = mongoose.model('Number', NumberSchema);