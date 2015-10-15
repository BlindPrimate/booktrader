'use strict';

describe('Service: googleBooks', function () {

  // load the service's module
  beforeEach(module('bookbrokerApp'));

  // instantiate service
  var googleBooks;
  beforeEach(inject(function (_googleBooks_) {
    googleBooks = _googleBooks_;
  }));

  it('should do something', function () {
    expect(!!googleBooks).toBe(true);
  });

});
