'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicketSchema = new Schema({
  tickets: Array,
  used: Boolean
});

module.exports = mongoose.model('Ticket', TicketSchema);