'use strict';

angular.module('teamNinjaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });