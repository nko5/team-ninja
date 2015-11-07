'use strict';

angular.module('teamNinjaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.home', {
        url: '/',
        templateUrl: 'app/home-page/home-page.html',
        controller: 'HomePageCtrl',
        controllerAs: "ctrl"
      });
  });