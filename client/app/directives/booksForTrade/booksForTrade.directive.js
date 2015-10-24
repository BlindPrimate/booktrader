'use strict';

angular.module('bookbrokerApp')
  .directive('booksForTrade', function () {
    return {
      templateUrl: 'app/directives/booksForTrade/booksForTrade.html',
      restrict: 'E',
      scope: {},
      controller: function ($scope, Auth, bookFactory){
        var init = function () {
          $scope.tradeShelf = [];
        }

        $scope.isBookOwner = function (book) {
          var currUsr = Auth.getCurrentUser()._id;
          if (book.owner_id === currUsr) {
            return true;
          } else {
            return false;
          }
        }

        bookFactory.getPendingTrades().then(function (results) {
          $scope.tradeShelf = results.data;
        });


        $scope.cancelTrade = function (book) {
          bookFactory.cancelTrade(book._id).then(function (results) {
            $scope.tradeShelf.splice($scope.tradeShelf.indexOf(results), 1)
          });
        }

        $scope.requestTrade = function (book) {
          bookFactory.requestTrade(book).then(function (results) {

          });
        }

        init();
      },
      link: function (scope, element, attrs) {
      }
    };
  });
