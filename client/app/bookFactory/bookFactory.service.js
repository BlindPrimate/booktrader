'use strict';

angular.module('bookbrokerApp')
  .factory('bookFactory', function ($http, Auth) {
    // Service logic
    // ...

    var user = Auth.getCurrentUser();
    var bookshelfUrl = '/api/users/bookshelf/'
    var tradeUrl = '/api/trades/'
    var searchUrl = '/api/books/search/';

    // Public API here
    return {
      searchBooks: function (searchTerm) {
        return $http.get(searchUrl + searchTerm);
      },
      saveBook: function (newBook) {
        return $http.patch(bookshelfUrl,  newBook);
      },
      removeBook: function (bookId) {
        return $http.delete(bookshelfUrl + bookId);
      },
      getUserBookshelf: function () {
        return $http.get(bookshelfUrl);
      },
      tradeBook: function (book) {
        return $http.post(tradeUrl, book)
      }
    };
  });
