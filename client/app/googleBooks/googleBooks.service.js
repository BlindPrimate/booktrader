'use strict';

angular.module('bookbrokerApp')
  .factory('googleBooks', function ($http) {
    // Service logic
    // ...

    var bookSearchUrl = 'https://www.googleapis.com/books/v1/volumes?q='

    // Public API here
    return {
      bookSearch: function (searchTerm) {
        return $http.get(bookSearchUrl + searchTerm);
      }
    };
  });
