/* global io */
'use strict';

angular.module('teamNinjaApp')
    .factory('SocketIO', function (socketFactory, AppConstants, Auth) {
        var self = this,
            socket,
            ioSocket;

        self.socket = null;

        self.send = function (event, data) {
            socket.emit(event, data);
        };

        self.bindAll = function (events) {
            events.forEach(function (event) {
                socket.on(event.name, event.callback);
            });
        };

        self.unbindAll = function (events) {
            events.forEach(function (event) {
                socket.removeAllListeners(event);
            });
        };

        var connect = function () {
            ioSocket = io('', {
                'query': 'token=' + Auth.getToken(),
                'aaa': 'aaa',
                path: '/socket.io-client'
            });
            socket = socketFactory({
                ioSocket: ioSocket
            });
            self.socket = socket;
        };

        Auth.isLoggedInAsync(function (isLoggedIn) {
            if (user) {
                connect();
            }
        });

    });
