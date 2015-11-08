'use strict';

angular.module('teamNinjaApp')
    .controller('HomePageCtrl', function ($scope, SocketIO,$state) {
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

    $scope.goToLogin = function(){
      $state.go('login');
    }
    });
