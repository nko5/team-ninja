/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var Game = require('../api/game/game.model');
var User = require('../api/user/user.model');
var socketioJwt = require('socketio-jwt');
var Constants = require("../components/constants");

module.exports = function (socketio) {
    socketio.set('authorization', socketioJwt.authorize({
        secret: config.secrets.session,
        handshake: true
    }));

    socketio.on('connection', function (socket) {
        var currentUser;

        User.findById(socket.client.request.decoded_token._id, function (err, user) {
            currentUser = user;
            console.log(user.name, ': CONNECTED');
        });

        socket.connectedAt = new Date();

        socket.on(Constants.Events.JOIN, function (data) {
            Game.findById(data.gameId, function (err, game) {
                if (game && game.hasPlayer(currentUser)) {
                    socket.join(socket.gameId);
                    socket.broadcast.to(socket.gameId).emit(Constants.Events.JOIN, 'SERVER', {
                        source: currentUser
                    });
                } else {

                }
            })
        });

        socket.on(Constants.Events.CHAT, function (data) {
            if (socket.gameId) {
                socket.broadcast.to(socket.gameId).emit(Constants.Events.CHAT, 'SERVER', {
                    source: currentUser,
                    message: data.message
                });
            }
        });

        socket.on(Constants.Events.LEAVE, function (data) {
            if (socket.gameId) {
                socket.broadcast.to(socket.gameId).emit(Constants.Events.LEAVE, 'SERVER', {
                    source: currentUser
                });
            }
        });

        socket.on(Constants.Events.CLAIM, function (data) {
            if (socket.gameId) {
                socket.broadcast.to(socket.gameId).emit(Constants.Events.CLAIM, 'SERVER', {
                    source: currentUser,
                    rule: data.rule
                });
            }
        });

        socket.on('disconnect', function () {
            if (socket.gameId) {
                socket.broadcast.to(socket.gameId).emit(Constants.Events.LEAVE, 'SERVER', {
                    source: currentUser
                });
            }
            console.log(currentUser.name, ': DISCONNECTED');
        });

    });
};