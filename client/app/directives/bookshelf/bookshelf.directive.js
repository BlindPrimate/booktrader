'use strict';

angular.module('bookbrokerApp')
  .directive('bookshelf', function () {
    return {
      templateUrl: 'app/directives/bookshelf/bookshelf.html',
      restrict: 'E',
      scope: {},
      controller: function ($scope, bookFactory, socket, Modal) {
        var init = function () {
          $scope.bookhself = [];
        }

        $scope.removeBook = Modal.confirm.delete(function(book) {
          bookFactory.removeBook(book._id).then(function () {
            $scope.bookshelf.splice($scope.bookshelf.indexOf(book), 1);
          });
        });

        $scope.tradeBook = function (book) {
          bookFactory.tradeBook(book).then(function (results) {
            book.forTrade = true;
          });
        }

        $scope.cancelTrade = function (book) {
          bookFactory.cancelTrade(book._id).then(function (results) {
            book.forTrade = false;
          });
        }

        bookFactory.getUserBookshelf().then(function (results) {
          $scope.bookshelf = results;
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
