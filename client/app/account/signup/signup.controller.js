'use strict';

angular.module('teamNinjaApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
