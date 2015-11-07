/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Constants = require("../../components/constants");

exports.register = function(socket) {
    socket.on(Constants.Events.CHAT, function (data) {
        data.dateCreated = +new Date();
        socket.broadcast.emit(Constants.Events.CHAT, data);
    });
};