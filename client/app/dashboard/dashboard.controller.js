'use strict';

angular.module('teamNinjaApp')
  .controller('DashboardCtrl', function ($scope, GameApi, Auth, $state) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.goToProjector = function (user) {
      GameApi.save({
        host: {
          id: user._id,
          name: user.name,
          picture: user.picture
        }
      }, function (result) {
        if (result && result._id) {
          $state.go('main.projector', {id: result._id});
        }
      });
    };

    $scope.joinGame = function () {
      $state.go('join');
    }
  });
