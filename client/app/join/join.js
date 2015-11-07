'use strict';

angular.module('teamNinjaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('join', {
        url: '/join',
        templateUrl: 'app/join/join.html',
        controller: 'JoinCtrl'
      });
  });
