'use strict';

angular.module('teamNinjaApp')
    .service('PopupService', function ($uibModal) {
        var self = this;

        self.invite = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/popups/invite.popup.html',
                controller: function () {
                    var self = this;
                    self.invites = [{email:" "}];

                    self.sendInvite = function () {
                        console.log("asasas");
                        self.busy = true;
                        User.invitePlayer({
                            users: self.invites,
                            gameId: self.game._id
                        }, function (result) {
                            self.busy = false;
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
                    };

                    self.add = function () {
                        self.invites.push({"email": " "});
                    };
                },
                controllerAs: "popup",
                size: "xs"
            });
        };

    });
