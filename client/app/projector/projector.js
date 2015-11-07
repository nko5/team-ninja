'use strict';

angular.module('teamNinjaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.projector', {
        url: '/projector',
        templateUrl: 'app/projector/projector.html',
        controller: 'ProjectorCtrl as projector'
      });
  });