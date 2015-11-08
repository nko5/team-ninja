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
                    if(!socket.gameId){
                        socket.gameId = data.gameId;
                        socket.join(data.gameId);
                        socket.join(currentUser._id);
                    }
                    socket.to(data.gameId).emit(Constants.Events.JOIN, {
                        source: currentUser
                    });
                } else {
                    console.log("No Game");
                }
            })
        });

        socket.on(Constants.Events.CHAT, function (data) {
            if (socket.gameId) {
                socket.broadcast.to(socket.gameId).emit(Constants.Events.CHAT, {
                    source: currentUser,
                    message: data.message
                });
            }
        });

        socket.on(Constants.Events.ACKNOWLEDGE, function (data) {
            if (socket.gameId) {
                socket.broadcast.to(data.userId).emit(Constants.Events.ACKNOWLEDGE, {
                    ack: true
                });
            }
        });

        socket.on(Constants.Events.REWARD, function (data) {
            if (socket.gameId) {
                socket.broadcast.to(data.userId).emit(Constants.Events.REWARD, data);
            }
        });

        socket.on(Constants.Events.LEAVE, function (data) {
            if (socket.gameId) {
                socket.broadcast.to(socket.gameId).emit(Constants.Events.LEAVE, {
                    source: currentUser
                });
            }
        });

        socket.on(Constants.Events.CLAIM, function (data) {
            if (socket.gameId) {
                console.log("Received Claim from",data);
                socket.broadcast.to(socket.gameId).emit(Constants.Events.CLAIM, {
                    source: currentUser,
                    rule: data.rule
                });
            }
        });

        socket.on('disconnect', function () {
            if (socket.gameId) {
                socket.broadcast.to(socket.gameId).emit(Constants.Events.LEAVE, {
                    source: currentUser
                });
            }
            console.log(currentUser.name, ': DISCONNECTED');
        });

    });
};