'use strict';

describe('Directive: pendingRequests', function () {

  // load the directive's module and view
  beforeEach(module('bookbrokerApp'));
  beforeEach(module('app/pendingRequests/pendingRequests.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pending-requests></pending-requests>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pendingRequests directive');
  }));
});