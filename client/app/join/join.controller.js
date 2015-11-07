'use strict';

angular.module('teamNinjaApp')
  .controller('JoinCtrl', function ($scope,GameApi,Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.openTicket = function(user){
      GameApi.addPlayer({gameId : $scope.code, user : user},function(result){
        alert(result);
      });
    }
  });
