'use strict';

describe('Controller: ManagerCtrl', function () {

  // load the controller's module
  beforeEach(module('faeloApp'));

  var ManagerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagerCtrl = $controller('ManagerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
