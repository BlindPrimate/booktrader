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
      removeBook: function (bookId) {
        return $http.delete(bookUrl + bookId);
      },
      getUserBookshelf: function () {
        //return $q.all({
            //bookshelf: $http.get(bookshelfUrl),
            //trades: $http.get(tradeUrl + 'me')
        //}).then(function (results) {
          //var bookshelf = _.map(results.bookshelf.data, function (book) {
            //var tradeEntry = _.find(results.trades.data, {'googleId': book.googleId });
            //if (tradeEntry) {
              //book.forTrade = true;
            //} else {
              //book.forTrade = false;
            //}
            //return book;
          //});
        return $http.get(bookshelfUrl).then(function (books) {
          return books.data;
        });
          //return bookshelf;
        //});
      },
      tradeBook: function (book) {
        return $http.post(tradeUrl, book);
      },
      cancelTrade: function (bookId) {
        return $http.delete(tradeUrl + bookId);
      },
      getPendingTrades: function () {
        return $http.get(tradeUrl + 'pending');
      },
      requestTrade: function (book) {
        return $http.put(tradeUrl + book._id, 
            {
              requested: true,
              requester: user
            })
            .then(function (trade) {
              return trade.data;
            });
      },
      confirmTradeRequest: function (book) {
        return $http.put(tradeUrl + book._id, 
            {
              forTrade: false,
              completed: true,
              dateCompleted: Date.now()
            })
            .then(function (trade) {

            });
      },
      getTradeRequests: function () {
        return $http.get(tradeUrl + 'requested/me')
          .then(function (books) {
            return books.data;
          });
      }
    }
  });
