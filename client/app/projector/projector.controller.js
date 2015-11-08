'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (Veronica, GameApi, $interval, $scope, AppConstants, SocketIO, User, Auth, $timeout, $stateParams, PopupService) {
        var self = this;
        var Events = AppConstants.Events;
        $scope.showMessage = false;
        $scope.getCurrentUser = Auth.getCurrentUser;
        self.number = null;
        self.connectedPlayers = [];
        self.invite = PopupService.invite;
        var init = function () {
            GameApi.get({id: $stateParams.id}, function (data) {
                self.game = data;
                SocketIO.send(AppConstants.Events.JOIN, {gameId: $stateParams.id});
            });
        };

        var displayMessage = function (player, message, duration, cb) {
            player.message = message;
            $timeout(function () {
                if (player.message == message) {
                    player.message = "";
                }
                cb && cb();
            }, duration);
        };

        var findAndDisableRule = function (rule) {
            self.game.rules.forEach(function (item, index) {
                if (item._id == rule._id) {
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

        var findUser = function (id) {
            var user = null;

            self.connectedPlayers.forEach(function (player, index) {
                if (player.id == id) {
                    user = {
                        obj: player,
                        index: index
                    }
                }
            });

            return user;
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

        var showMessage = function (data) {
            var user = findUser(data.source._id);
            if (user) {
                displayMessage(user.obj, data.message, 3000);
            }
        };
        var disablePrize = function (data) {
            var user = findUser(data.source._id);
            if (user) {
                findAndDisableRule(data.rule);
                displayMessage(user.obj, data.rule.name, 2000);
            }
        };

        var addUser = function (data) {
            var user = findUser(data.source._id);
            if (!user) {
                self.connectedPlayers.push({
                    id: data.source._id,
                    name: data.source.name,
                    picture: data.source.picture
                });
            }
            SocketIO.send(Events.ACKNOWLEDGE, {userId: data.source._id})
        };

        var removeUser = function (data) {
            var user = findUser(data.source._id);
            if (user) {
                displayMessage(user.obj, "Bye Bye!", 1000, function () {
                    self.connectedPlayers.splice(user.index, 1);
                });
            }
        };

        SocketIO.bindAll([{
            name: Events.CHAT,
            callback: showMessage
        }, {
            name: Events.CLAIM,
            callback: disablePrize
        }, {
            name: Events.JOIN,
            callback: addUser
        }, {
            name: Events.LEAVE,
            callback: removeUser
        }]);

        $scope.$on("$destroy", function () {
            SocketIO.unbindAll([
                Events.CHAT,
                Events.CLAIM,
                Events.LEAVE,
                Events.JOIN,
                Events.ACKNOWLEDGE
            ])
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
