'use strict';

angular.module('bookbrokerApp')
  .directive('bookshelf', function () {
    return {
      templateUrl: 'app/bookshelf/bookshelf.html',
      restrict: 'E',
      scope: {},
      controller: function ($scope, bookFactory) {
        var init = function () {
          $scope.bookhself = [];
        }

        $scope.removeBook = function (bookObj) {
          bookFactory.removeBook(bookObj.googleId).then(function (book) {
            $scope.bookshelf.splice($scope.bookshelf.indexOf(bookObj), 1);
          });
        }

        bookFactory.getUserBookshelf().then(function (results) {
          $scope.bookshelf = results.data;
        });

        init();
      },
      link: function (scope, element, attrs) {
      }
    };
  });
