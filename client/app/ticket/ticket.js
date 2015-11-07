'use strict';

angular.module('teamNinjaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ticket', {
        url: '/ticket',
        templateUrl: 'app/ticket/ticket.html',
        controller: 'TicketCtrl',
        controllerAs: "ctrl"
      });
  });