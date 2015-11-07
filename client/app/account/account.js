'use strict';

angular.module('teamNinjaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        resolve: {
          factory: ['$location', 'Auth','$q', checkUserSession]
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          factory: ['$location', 'Auth','$q', checkUserSession]
        }
      })
  });

var checkUserSession = function ($location, Auth, $q) {
  var userPromise = Auth.getCurrentUser(),
    defer = $q.defer();
  console.log(userPromise);
  if (userPromise.email) {
    userPromise.$promise.then(function (user) {
      $location.path('/dashboard');
      defer.resolve(user);
    });
  } else {
    defer.resolve(null);
  }
  return defer.promise;
};