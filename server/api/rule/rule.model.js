'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RuleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Rule', RuleSchema);