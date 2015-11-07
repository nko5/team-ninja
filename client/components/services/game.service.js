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
                update: {
                    method: 'PUT'
                }
            });
    });