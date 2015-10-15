'use strict';

describe('Directive: newBook', function () {

  // load the directive's module and view
  beforeEach(module('bookbrokerApp'));
  beforeEach(module('app/newBook/newBook.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<new-book></new-book>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the newBook directive');
  }));
});