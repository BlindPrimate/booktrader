'use strict';

describe('Directive: booksForTrade', function () {

  // load the directive's module and view
  beforeEach(module('bookbrokerApp'));
  beforeEach(module('app/booksForTrade/booksForTrade.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<books-for-trade></books-for-trade>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the booksForTrade directive');
  }));
});