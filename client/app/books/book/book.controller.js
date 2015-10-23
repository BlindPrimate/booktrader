'use strict';

angular.module('bookbrokerApp')
  .controller('BookCtrl', function ($scope, bookFactory) {
    bookFactory.getSingleBook($scope.book.googleId).then(function (results) {
      $scope.book = results.data;
    });
  });
