'use strict';

angular.module('teamNinjaApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      invitePlayer : {
        method : 'POST',
        params: {
          id:'invite'
        }
      }
	  });
  });
