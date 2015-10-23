'use strict';

angular.module('bookbrokerApp')
  .factory('bookFactory', function ($http, Auth) {
    // Service logic
    // ...

    var user = Auth.getCurrentUser();
    var bookUrl = '/api/books/'
    var bookshelfUrl = '/api/books/bookshelf/'
    var searchUrl = '/api/books/search/';

    // Public API here
    return {
      searchBooks: function (searchTerm) {
        return $http.get(searchUrl + searchTerm);
      },
      getSingleBook: function (bookId) {
        return $http.get(bookUrl + 'google/' + bookId);
      },
      saveBook: function (newBook) {
        return $http.post(bookshelfUrl,  newBook);
      },
      removeBook: function (bookId) {
        return $http.delete(bookUrl + bookId);
      },
      getUserBookshelf: function () {
        return $http.get(bookshelfUrl);
      },
      tradeBook: function (bookId) {
        return $http.put(bookUrl + bookId, {forTrade: true});
      },
      cancelTrade: function (bookId) {
        return $http.put(bookUrl + bookId, {forTrade: false});
      },
      getTrades: function () {
        return $http.get(bookUrl + "trades");
      },
      requestTrade: function (book) {
        return $http.put();
      }
    };
  });
