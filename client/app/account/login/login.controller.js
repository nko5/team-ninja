'use strict';

angular.module('teamNinjaApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
