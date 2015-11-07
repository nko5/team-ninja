/**
 * Broadcast updates to client when the model changes
 */

'use strict';

exports.register = function(socket) {
    socket.on("CHAT", function (msg) {
        socket.emit("CHAT", {msg: msg});
    });
};