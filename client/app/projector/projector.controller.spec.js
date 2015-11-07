'use strict';

describe('Controller: ProjectorCtrl', function () {

  // load the controller's module
  beforeEach(module('teamNinjaApp'));

  var ProjectorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectorCtrl = $controller('ProjectorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
