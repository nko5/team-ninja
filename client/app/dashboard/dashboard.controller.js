'use strict';

angular.module('teamNinjaApp')
  .controller('DashboardCtrl', function ($scope, GameApi, Auth,$state) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.goToProjector = function (role, user) {
      if (role == 'host') {
        GameApi.save({
          host: {
            id: user._id,
            name: user.name,
            picture: user.profile_image_icon
          }
        }, function (result) {
          if(result && result._id){
            $state.go('main.projector', {id:result._id});
          }
        });
      }
    }
  });
