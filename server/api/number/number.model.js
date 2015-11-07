'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NumberSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Number', NumberSchema);