'use strict';

describe('Controller: TicketCtrl', function () {

  // load the controller's module
  beforeEach(module('teamNinjaApp'));

  var TicketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TicketCtrl = $controller('TicketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
