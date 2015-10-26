'use strict';

angular.module('bookbrokerApp')
  .controller('BookCtrl', function ($scope, $stateParams, bookFactory, Modal) {

    bookFactory.getSingleBook($stateParams.id).then(function (bookData) {
      $scope.book = bookData;
    });

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
        $scope.tradeShelf.splice($scope.tradeShelf.indexOf(results), 1)
      });
    }

    $scope.requestTrade = function (book) {
      bookFactory.requestTrade(book).then(function (results) {

      });
    }



  });
