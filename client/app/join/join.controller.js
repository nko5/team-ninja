'use strict';

angular.module('teamNinjaApp')
  .controller('JoinCtrl', function ($scope,GameApi,Auth,$state) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.openTicket = function(user){
      GameApi.addPlayer({gameId : $scope.code, user : user},function(result){
       if(result.updated)
       $state.go('ticket', {id :$scope.code});
        else
       alert("Invalid code!!");
      });
    }
  });
