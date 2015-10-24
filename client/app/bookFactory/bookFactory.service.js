'use strict';

angular.module('bookbrokerApp')
  .factory('bookFactory', function ($http, Auth, $q) {
    // Service logic
    // ...

    var user = Auth.getCurrentUser();
    var bookUrl = '/api/books/';
    var bookshelfUrl = '/api/books/bookshelf/';
    var searchUrl = '/api/books/search/';
    var tradeUrl = '/api/trades/';

    // Public API here
    return {
      searchBooks: function (searchTerm) {
        return $http.get(searchUrl + searchTerm).then(function (results) {
          return results.data;
        });
      },
      getSingleBook: function (bookId) {
        return $http.get(bookUrl + 'google/' + bookId).then(function (book) {
          return book.data;
        });
      },
      saveBook: function (newBook) {
        return $http.post(bookshelfUrl,  newBook).then(function (savedBook) {
          return savedBook.data;
        });
      },
      removeBook: function (bookId) {
        return $http.delete(bookUrl + bookId);
      },
      getUserBookshelf: function () {
        return $q.all({
            bookshelf: $http.get(bookshelfUrl),
            trades: $http.get(tradeUrl + 'user/' + user)
        }).then(function (results) {
          var bookshelf = _.map(results.bookshelf.data, function (book) {
            var tradeEntry = _.find(results.trades.data, {'googleId': book.googleId });
            if (tradeEntry) {
              book.forTrade = true;
            } else {
              book.forTrade = false;
            }
            return book;
          });
          return bookshelf;
        });
      },
      tradeBook: function (book) {
        return $http.post(tradeUrl, book);
      },
      cancelTrade: function (bookId) {
        return $http.delete(tradeUrl + bookId);
      },
      getTrades: function () {
        return $http.get(tradeUrl);
      },
      requestTrade: function (book) {
        return $http.put();
      }
    };
  });
