'use strict';

angular.module('bookbrokerApp')
  .directive('pendingRequests', function () {
    return {
      templateUrl: 'app/directives/pendingRequests/pendingRequests.html',
      restrict: 'E',
      scope: {},
      controller: function ($scope, bookFactory) {
        var init = function () {
          $scope.trades = [];
        }


        bookFactory.getTradeRequests().then(function (books) {
          $scope.trades = books;
        });



        init();
      },
      link: function (scope, element, attrs) {
      }
    };
  });
