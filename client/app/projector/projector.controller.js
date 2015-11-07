'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (Veronica, GameApi, $interval, $scope, AppConstants, SocketIO, User, Auth, $timeout, $stateParams) {
        var self = this;
        self.number;
        $scope.showMessage = false;

        $scope.getCurrentUser = Auth.getCurrentUser;

        GameApi.get({id: $stateParams.id}, function (data) {
            self.game = data;
            startCalling();
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

        SocketIO.socket.on("JOIN", function (data) {
            self.game.players.push(data.user);
        });

        SocketIO.socket.on("LEAVE", function (data) {
            var userToRemove;
            self.game.players.forEach(function(user, index){
                if(user._id == data.userId){
                    userToRemove = index;
                }
            });
            self.game.players.splice(userToRemove, 1);
        });

        SocketIO.socket.on("CLAIM", function (data) {
            var userToUpdate;
            self.game.players.forEach(function(user){
                if(user._id == data.userId){
                    userToUpdate = user;
                }
            });

            userToUpdate.message = data.rule.name;

            $timeout(function(){
                if(data.rule.name == userToUpdate.message){
                    userToUpdate.message = "";
                }
            }, 2000);
        });

        SocketIO.socket.on("CHAT", function (data) {
            var userToUpdate;
            self.game.players.forEach(function(user){
                if(user._id == data.userId){
                    userToUpdate = user;
                }
            });

            if(userToUpdate) {
                userToUpdate.message = data.message;

                $timeout(function(){
                    if(data.message == userToUpdate.message){
                        userToUpdate.message = "";
                    }
                    userToUpdate.message = "";
                }, 2000);
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
    });
