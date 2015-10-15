'use strict';

describe('Service: bookFactory', function () {

  // load the service's module
  beforeEach(module('bookbrokerApp'));

  // instantiate service
  var bookFactory;
  beforeEach(inject(function (_bookFactory_) {
    bookFactory = _bookFactory_;
  }));

  it('should do something', function () {
    expect(!!bookFactory).toBe(true);
  });

});
