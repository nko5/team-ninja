'use strict';

angular.module('teamNinjaApp')
    .factory('NumberApi', function ($resource) {
        return $resource('/api/numbers/:id/:action', {
                id: '@_id'
            },
            {
                get: {
                    method: 'GET'
                },
                update: {
                    method: 'PUT'
                },
                delete: {
                    method: 'DELETE'
                }
            });
    });