/* global io */
'use strict';

angular.module('teamNinjaApp')
    .factory('SocketIO', function (socketFactory, AppConstants, Auth) {
        var self = this,
            socket,
            ioSocket;

        self.socket = null;
        var queue = [];

        self.send = function (event, data) {
            socket.emit(event, data);
        };

        var _bindAll = function (events) {
            events.forEach(function (event) {
                socket.on(event.name, event.callback);
            });
        };

        self.bindAll = function (events) {
            if (!socket) {
                queue.push(function () {
                    _bindAll(events);
                })
            } else {
                _bindAll(events);
            }
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
            queue.forEach(function (cb) {
                cb();
            });
        };

        Auth.isLoggedInAsync(function (isLoggedIn) {
            if (isLoggedIn) {
                connect();
            }
        });
        return self;

    });
