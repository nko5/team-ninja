'use strict';

angular.module('teamNinjaApp')
    .controller('HomePageCtrl', function ($scope, SocketIO) {
        var self = this,
            socket = SocketIO.socket;

        self.messages = [];
        $scope.message = 'Hello';

        self.sendChat = function () {
            SocketIO.send("CHAT", self.chatMsg);
            self.chatMsg = "";
        };

        $scope.$on("socket:CHAT", function (evt, resp) {
            self.messages.push(resp.msg);
        });
    });
