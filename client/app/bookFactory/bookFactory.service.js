'use strict';

angular.module('bookbrokerApp')
  .factory('bookFactory', function ($http, Auth) {
    // Service logic
    // ...

    var user = Auth.getCurrentUser();
    var url = '/api/books/'
    var bookshelfUrl = '/api/users/bookshelf/'

    // Public API here
    return {
      searchBooks: function (searchTerm) {
        return $http.get(url + 'search/' + searchTerm);
      },
      getBooks: function () {
        return $http.get(url);
      },
      saveBook: function (newBook) {
        return $http.patch(bookshelfUrl,  newBook);
      },
      removeBook: function (bookId) {
        return $http.delete(bookshelfUrl + bookId);
      },
      getUserBookshelf: function () {
        return $http.get(bookshelfUrl);
      }
    };
  });
