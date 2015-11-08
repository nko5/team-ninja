'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (Veronica, GameApi, $interval, $scope, AppConstants, SocketIO, User, Auth, $timeout, $stateParams) {
        var self = this;
        self.number;
        $scope.showMessage = false;

        $scope.getCurrentUser = Auth.getCurrentUser;

        GameApi.get({id: $stateParams.id}, function (data) {
            self.game = data;
        });

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

        $scope.sendInvite = function (user) {
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
                userToUpdate.message = data.message;
                $timeout(function () {
                    if (data.message == userToUpdate.message) {
                        userToUpdate.message = "";
                    }
                    userToUpdate.message = "";
                }, 2000);
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
                userToUpdate.message = data.rule.name;
                $timeout(function () {
                    if (data.rule.name == userToUpdate.message) {
                        userToUpdate.message = "";
                    }
                }, 2000);
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
    });
