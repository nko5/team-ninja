'use strict';

angular.module('teamNinjaApp')
  .factory('GameApi', function ($resource) {
    return $resource('/api/games/:id/:action', {
        id: '@_id'
      },
      {
        get: {
          method: 'GET'
        },
        callNumber: {
          method: 'GET',
          params: {
            action: "callNumber"
          }
        },
        list: {
          get: {
            method: 'GET'
          }
        },
        update: {
          method: 'PUT'
        },
        save: {
          method: 'POST'
        },
        addPlayer: {
          method: 'POST',
          params: {
            id: "addPlayer"
          }
        }
      });
  });