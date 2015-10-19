'use strict';

angular.module('bookbrokerApp')
  .directive('bookshelf', function () {
    return {
      templateUrl: 'app/bookshelf/bookshelf.html',
      restrict: 'E',
      scope: {},
      controller: function ($scope, bookFactory, socket) {
        var init = function () {
          $scope.bookhself = [];
        }

        $scope.removeBook = function (book) {
          bookFactory.removeBook(book._id).then(function (books) {
            $scope.bookshelf = books.data;
          });
        }

        $scope.tradeBook = function (book) {
          bookFactory.tradeBook(book._id).then(function (results) {
            book.forTrade = true;
          });
        }

        $scope.cancelTrade = function (book) {
          bookFactory.cancelTrade(book._id).then(function (results) {
            book.forTrade = false;
          });
        }

        bookFactory.getUserBookshelf().then(function (results) {
          $scope.bookshelf = results.data;
          //socket.syncUpdates('book', $scope.bookshelf);
        });

        init();
      },
      link: function (scope, element, attrs) {
      }
    };
  });
