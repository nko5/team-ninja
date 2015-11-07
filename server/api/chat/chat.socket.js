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
    socket.on(Constants.Events.JOIN, function (data) {
        data.dateCreated = +new Date();
        socket.broadcast.emit(Constants.Events.JOIN, data);
    });
    socket.on(Constants.Events.LEAVE, function (data) {
        data.dateCreated = +new Date();
        socket.broadcast.emit(Constants.Events.LEAVE, data);
    });
    socket.on(Constants.Events.CLAIM, function (data) {
        data.dateCreated = +new Date();
        socket.broadcast.emit(Constants.Events.CLAIM, data);
    });
};