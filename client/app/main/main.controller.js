'use strict';

angular.module('teamNinjaApp')
  .controller('MainCtrl', function ($state) {
    $state.go('login');
  });
