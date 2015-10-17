'use strict';

angular.module('bookbrokerApp')
  .factory('bookFactory', function ($http, Auth) {
    // Service logic
    // ...

    var user = Auth.getCurrentUser();
    var url = '/api/books/'
    var userUrl = '/api/users/'

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
      saveBook: function (newBook) {
        return $http.patch(userUrl + user._id + '/bookshelf',  newBook);
      },
      deleteBook: function (bookId) {
        return $http.delete(url + bookId);
      },
      getUserBookshelf: function () {
        return $http.get(userUrl + user._id + '/bookshelf');
      }
    };
  });
