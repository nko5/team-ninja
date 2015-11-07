'use strict';

angular.module('teamNinjaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.projector', {
        url: '/game/:id/projector',
        templateUrl: 'app/projector/projector.html',
        controller: 'ProjectorCtrl as projector'
      });
  });