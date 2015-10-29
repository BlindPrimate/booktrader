'use strict';

angular.module('bookbrokerApp')
  .controller('BookCtrl', function ($scope, $stateParams, bookFactory, Modal, Auth) {

    var init = function () {
      bookFactory.getSingleBook($stateParams.id).then(function (bookData) {
        $scope.book = bookData;
        $scope.isBookOwner = function (book) {
          if (book.owner === Auth.getCurrentUser()._id) {
            return true;
          } else {
            return false;
          }
        }

        $scope.isBookRequester = function (book) {
          if (book.requester === Auth.getCurrentUser()._id) {
            return true;
          } else {
            return false;
          }
        }
      });
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
      bookFactory.cancelTrade(book).then(function (results) {
        book.forTrade = false;
      });
    }

    $scope.requestTrade = function (book) {
      bookFactory.requestTrade(book).then(function (results) {
        book.requested = true;
      });
    }

    $scope.acceptTrade = function (book) {
      bookFactory.acceptTradeRequest(book).then(function (results) {
        book.completed = true;
      });
    }

    init();

  });
