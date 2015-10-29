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
        return $http.get(searchUrl + searchTerm).then(function (books) {
          return books.data;
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
      removeBook: function (book) {
        return $http.delete(bookUrl + book._id);
      },
      getUserBookshelf: function () {
        return $http.get(bookshelfUrl).then(function (books) {
          return books.data;
        });
      },
      tradeBook: function (book) {
        return $http.put(bookUrl + book._id, {
          forTrade: true,
        });
      },
      cancelTrade: function (book) {
        return $http.put(bookUrl + book._id, {
          forTrade: false,
        });
      },
      getPendingTrades: function () {
        return $http.get(bookUrl + 'trades');
      },
      requestTrade: function (book) {
        return $http.put(bookUrl + book._id, {
              requested: true,
              requester: user
            })
            .then(function (trade) {
              return trade.data;
            });
      },
      acceptTradeRequest: function (book) {
        return $http.put(bookUrl + book._id, {
              owner: book.requester,
              requested: false,
              forTrade: false,
              completed: true,
            })
            .then(function (trade) {
              return trade.data;
            });
      },
      getTradeRequests: function () {
        return $http.get(bookUrl + 'pendingrequests')
          .then(function (books) {
            return books.data;
          });
      }
    }
  });
