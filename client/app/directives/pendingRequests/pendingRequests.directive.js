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



        init();
      },
      link: function (scope, element, attrs) {
      }
    };
  });
