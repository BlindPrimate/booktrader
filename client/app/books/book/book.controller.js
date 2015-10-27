'use strict';

angular.module('bookbrokerApp')
  .controller('BookCtrl', function ($scope, $stateParams, bookFactory, Modal, Auth) {

    var init = function () {

    }

    $scope.isBookOwner = function (book) {
      if (book.owner_id === Auth.getCurrentUser()._id) {
        return true;
      } else {
        return false;
      }
    }

    $scope.isBookRequester = function (book) {
      if (book.requester_id === Auth.getCurrentUser()._id) {
        return true;
      } else {
        return false;
      }
    }

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
        book.forTrade = false;
      });
    }

    $scope.requestTrade = function (book) {
      bookFactory.requestTrade(book).then(function (results) {

      });
    }

    init();

  });
