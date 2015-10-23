'use strict';

angular.module('bookbrokerApp')
  .directive('bookshelf', function () {
    return {
      templateUrl: 'app/bookshelf/bookshelf.html',
      restrict: 'E',
      scope: {},
      controller: function ($scope, bookFactory, socket, Modal) {
        var init = function () {
          $scope.bookhself = [];
        }

        $scope.removeBook = function (book) {
          bookFactory.removeBook(book._id).then(function () {
            $scope.bookshelf.splice($scope.bookshelf.indexOf(book), 1);
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
          socket.syncUpdates('book', $scope.bookshelf, function (event, array, item) {

          });
        });

        $scope.openBook = Modal.singleBook(function () {
            
        });

        init();
      },
      link: function (scope, element, attrs) {
      }
    };
  });
