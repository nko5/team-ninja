'use strict';

angular.module('teamNinjaApp')
    .controller('DashboardCtrl', function ($scope, GameApi, Auth, $state) {
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.goToProjector = function () {
            GameApi.save({}, function (game) {
                if (game && game._id) {
                    $state.go('main.projector', {id: game._id});
                }
            });
        };

        $scope.joinGame = function () {
            $state.go('join');
        }
    });
