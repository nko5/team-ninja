'use strict';

angular.module('teamNinjaApp')
    .controller('TicketCtrl', function (GameApi, AppConstants, SocketIO, Auth, $scope, $stateParams, $state, $timeout) {
        var self = this;
        self.sections = [];
        self.sections.length = 27;
        self.started = false;
        self.selected = {};
        self.reward = {};
        self.health = 3;
        self.gameOver = false;
        self.showGameOver = false;
        self.toggle = function (item) {
            self.selected[item] = !self.selected[item];
        };

        self.closeWinMessage = function () {
            self.wonGame = false;
        };

        self.disableRule = function (identifier) {
            self.game.rules.forEach(function (rule) {
                if (rule.identifier == identifier) {
                    rule.disabled = true
                }
            })
        }

        var timer;
        var join = function () {
            SocketIO.send(AppConstants.Events.JOIN, {gameId: $stateParams.id});
            timer = $timeout(function () {
                if (!self.connected) {
                    console.log("joining");
                    join();
                }
            }, 5000);
        };

        Auth.isLoggedInAsync(function (isLoggedIn) {
            if (isLoggedIn) {
                SocketIO.bindAll([{
                    name: AppConstants.Events.CLAIM_RESULT,
                    callback: function (data) {
                        if (data.user._id == Auth.getCurrentUser()._id) {
                            self.wonGame = data.won;
                            if(data.won == false){
                                self.health--;
                                if(self.health <= 0){
                                    self.gameOver = true;
                                    self.showGameOver = true;
                                }
                            }
                        }
                        if (data.won) {
                            self.disableRule(data.rule.identifier);
                        }
                    }
                }, {
                    name: AppConstants.Events.ACKNOWLEDGE,
                    callback: function () {
                        self.connected = true;
                        $timeout.cancel(timer);
                    }
                }, {
                    name: AppConstants.Events.START,
                    callback: function () {
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
            for (var i = 0; i < self.game.tickets.length; i++) {
                var ticket = self.game.tickets[i];
                if (ticket.userId == Auth.getCurrentUser()._id) {
                    self.ticket = ticket;
                    self.health = ticket.health;
                    self.gameOver = ticket.health > 0 ? false: true;
                    break;
                }
            }
        });

        var getSelected = function () {
            var selected = [];
            for (var k in self.selected) {
                if (self.selected.hasOwnProperty(k)) {
                    selected.push(parseInt(k));
                }
            }
            return selected;
        };

        self.fireClaim = function (rule) {
            var selected = getSelected();
            if (!rule.disabled && self.gameOver == false) {
                SocketIO.send(AppConstants.Events.CLAIM, {rule: rule, gameId: $stateParams.id, selected: selected});
            }
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
