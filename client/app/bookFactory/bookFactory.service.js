'use strict';

angular.module('bookbrokerApp')
  .factory('bookFactory', function ($http) {
    // Service logic
    // ...

    var url = '/api/books/'

    // Public API here
    return {
      searchBooks: function (searchTerm) {
        return $http.get(url + 'search/' + searchTerm);
      },
      getBooks: function () {
        return $http.get(url);
      },
      getBook: function (bookId) {
        return $http.get(url + bookId);
      },
      saveBook: function (newBook, bookId) {
        if (bookId) {
          return $http.put(url + bookId,  newBook);
        } else {
          return $http.post(url,  newBook);
        }
      },
      deleteBook: function (bookId) {
        return $http.delete(url + bookId);
      }
    };
  });
