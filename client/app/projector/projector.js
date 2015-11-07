'use strict';

angular.module('teamNinjaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('projector', {
        url: '/projector',
        templateUrl: 'app/projector/projector.html',
        controller: 'ProjectorCtrl'
      });
  });