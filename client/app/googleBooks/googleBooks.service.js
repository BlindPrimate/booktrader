'use strict';

angular.module('bookbrokerApp')
  .factory('googleBooks', function ($http) {
    // Service logic
    // ...

    var bookSearchUrl = '/api/books/search/'

    // Public API here
    return {
      bookSearch: function (searchTerm) {
        return $http.get(bookSearchUrl + searchTerm);
      }
    };
  });
