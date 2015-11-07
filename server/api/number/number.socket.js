/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Number = require('./number.model');

exports.register = function(socket) {
  Number.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Number.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('number:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('number:remove', doc);
}