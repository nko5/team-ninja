'use strict';

angular.module('teamNinjaApp')
    .controller('TicketCtrl', function (GameApi, AppConstants, SocketIO, Auth, $scope) {
        var self = this;

        self.currentUser = Auth.getCurrentUser();

        self.currentUser && self.currentUser.$promise.then(function (user) {
            self.userObj = {
                type: AppConstants.Events.LEAVE,
                userId: self.currentUser._id,
                profile_image_icon: self.currentUser.profile_image_icon
            };
            SocketIO.send(AppConstants.Events.JOIN, self.userObj);
        });

        GameApi.list(function (data) {
            self.game = data.games[0];
        });

        self.fireClaim = function (rule) {
            var _obj = {
                type: AppConstants.Events.CLAIM,
                userId: self.currentUser._id,
                profile_image_icon: self.currentUser.profile_image_icon,
                rule: rule
            };
            SocketIO.send(AppConstants.Events.CLAIM, _obj);
        };

        self.sendChat = function () {
            var msg = self.message && self.message.trim();
            if(msg) {
                var _obj = {
                    type: AppConstants.Events.CHAT,
                    userId: self.currentUser._id,
                    profile_image_icon: self.currentUser.profile_image_icon,
                    message: self.message
                };
                SocketIO.send(AppConstants.Events.CHAT, _obj);
            }
        };

        $scope.$on("socket:" + AppConstants.Events.CHAT, function (evt, data) {
            console.log(data);
        });

        $scope.$on("$destroy", function () {
            SocketIO.send(AppConstants.Events.LEAVE, self.userObj);
        });
    });
