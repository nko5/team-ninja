'use strict';

angular.module('teamNinjaApp')
    .controller('TicketCtrl', function (GameApi, AppConstants, SocketIO, Auth, $scope, $stateParams, $state, $timeout) {
        var self = this;
        self.sections = [];
        self.sections.length = 27;
        self.started = false;
        var timer;
        var join = function(){
            SocketIO.send(AppConstants.Events.JOIN, {gameId: $stateParams.id});
            timer = $timeout(function(){
                if(!self.connected){
                    console.log("joining");
                    join();
                }
            }, 5000);
        };

        Auth.isLoggedInAsync(function (isLoggedIn) {
            if (isLoggedIn) {
                SocketIO.bindAll([{
                    name: AppConstants.Events.ACKNOWLEDGE,
                    callback: function () {
                        self.connected = true;
                        $timeout.cancel(timer);
                    }
                }, {
                    name: AppConstants.Events.START,
                    callback: function(){
                        self.started = true;
                    }
                }]);
                join();
            } else {
                $state.go("login");
            }
        });

        GameApi.get({id: $stateParams.id}, function (data) {
            self.game = data;
            for(var i = 0; i < self.game.tickets; i++){
                var ticket = self.game.tickets[i];
                if(ticket.userId == Auth.getCurrentUser()._id){
                    self.ticket = ticket;
                    console.log("found", ticket);
                    break;
                }
            }
        });

        self.fireClaim = function (rule) {
            SocketIO.send(AppConstants.Events.CLAIM, {rule: rule, gameId: $stateParams.id});
        };

        self.sendChat = function () {
            var message = self.message && self.message.trim();
            if (message) {
                SocketIO.send(AppConstants.Events.CHAT, {message: message, gameId: $stateParams.id});
                self.message = "";
            }
        };

        $scope.$on("$destroy", function () {
            SocketIO.send(AppConstants.Events.LEAVE, {gameId: $stateParams.id});
        });
    });
