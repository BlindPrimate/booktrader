'use strict';

angular.module('bookbrokerApp')
  .directive('booksForTrade', function () {
    return {
      templateUrl: 'app/booksForTrade/booksForTrade.html',
      restrict: 'E',
      controller: {
        var init = function ($scope, bookFactory) {

        }


        init();
      },
      link: function (scope, element, attrs) {
      }
    };
  });
