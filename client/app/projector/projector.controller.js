'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (Veronica, GameApi, $interval, $scope, AppConstants, SocketIO, User, Auth, $timeout, $stateParams) {
        var self = this;
        self.number;
        $scope.showMessage = false;

        $scope.getCurrentUser = Auth.getCurrentUser;

        var init = function(){
            GameApi.get({id: $stateParams.id}, function (data) {
                self.game = data;
            });
        };

        if(false){
            init = function(){
                GameApi.list({}, function (data) {
                    self.game = data.games[0];
                });
            };
        }

        var displayMessage = function(player, message, duration){
            player.message = message;
            $timeout(function(){
                if(player.message == message){
                    player.message = "";
                }
            }, duration);
        };

        var findAndDisableRule = function (rule) {
            self.game.rules.forEach(function(item, index){
                if(item._id == rule._id){
                    item.wonBy = true;
                }
            });
        };

        var promise;

        var startCalling = function () {
            if (!promise) {
                promise = $interval(callNumber, 7000);
            }
        };

        var clearInterval = function () {
            $interval.cancel(promise);
        };

        var callNumber = function () {
            GameApi.callNumber({id: self.game._id}, function (number) {
                self.number = number;
                Veronica.say(number.description, [{
                    delay: 1000,
                    message: number.inWords
                }]);
            });
        };

        $scope.$on("socket:" + AppConstants.Events.CHAT, function (evt, data) {
            console.log(data);
            var userToUpdate;
            for(var i = 0; i < self.game.players.length; i++) {
                if(self.game.players[i].userId == data.userId) {
                    userToUpdate = user;
                    break;
                }
            }

            if(userToUpdate) {
                displayMessage(userToUpdate, "Bye Bye!", 2000);
            }
        });

        $scope.$on("socket:" + AppConstants.Events.CLAIM, function (evt, data) {
            var userToUpdate;
            for(var i = 0; i < self.game.players.length; i++) {
                if(self.game.players[i].userId == data.userId) {
                    userToUpdate = user;
                    break;
                }
            }

            if(userToUpdate) {
                findAndDisableRule(data.rule);
                displayMessage(userToUpdate, data.rule.name, 2000);
            }

        });
        $scope.$on("socket:" + AppConstants.Events.JOIN, function (evt, data) {
            var isNewUser = true;
            for(var i = 0; i < self.game.players.length; i++) {
                if(self.game.players[i].userId == data.userId) {
                    isNewUser = false;
                    break;
                }
            }
            if(isNewUser) {
                self.game.players.push(data);
            }
        });
        $scope.$on("socket:" + AppConstants.Events.LEAVE, function (evt, data) {
            var userToRemove;
            self.game.players.forEach(function (user, index) {
                if (user.userId == data.userId) {
                    userToRemove = index;
                }
            });
            if(userToRemove) {
                self.game.players.splice(userToRemove, 1);
            }
        });

        $scope.$on("$destroy", function () {
            socket.removeAllListeners("JOIN");
            socket.removeAllListeners("LEAVE");
            socket.removeAllListeners("CLAIM");
            socket.removeAllListeners("CHAT");
        });

        $scope.$on("socket:" + AppConstants.Events.CHAT, function (evt, data) {
            console.log(data);
        });
        $scope.sendInvite = function (user) {
            console.log(user);
            if (user) {
                User.invitePlayer({
                    sender: user.email,
                    receiver: $scope.inviteEmail,
                    gameId: self.game._id
                }, function (result) {
                    $scope.showMessage = true;
                    if (result.sent) {
                        $scope.alertMessage = "Invite sent successfully.";
                    }
                    else {
                        $scope.alertMessage = "Error sending invite. Please try again later.";
                    }
                    $timeout(function () {
                        $scope.showMessage = false;
                    }, 3000);
                });
            }
        };

        init();
    });
