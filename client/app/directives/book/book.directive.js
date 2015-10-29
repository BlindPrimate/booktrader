'use strict';

angular.module('bookbrokerApp')
  .directive('book', function () {
    return {
      templateUrl: 'app/directives/book/book.html',
      restrict: 'E',
      controller: function ($scope, bookFactory, $state) {
        var init = function () {

        }

        $scope.openBook = function (book) {
          $state.go('book', {id: book._id});
        }

        init();

     },
     link: function (scope, element, attrs) {
        
     }
   };
 });
