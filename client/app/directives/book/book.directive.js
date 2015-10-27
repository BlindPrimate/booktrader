'use strict';

angular.module('bookbrokerApp')
  .directive('book', function () {
    return {
      templateUrl: 'app/directives/book/book.html',
      restrict: 'E',
      controller: function ($scope, bookFactory, $state) {


      $scope.openBook = function (book) {
        $state.go('book', {id: book._id});
      }


        //$scope.openBook = Modal.singleBook(function () {
            
        //});

        //$scope.removeBook = Modal.confirm.delete(function(book) {
          //bookFactory.removeBook(book._id).then(function () {
            //$scope.bookshelf.splice($scope.bookshelf.indexOf(book), 1);
          //});
        //});

        //$scope.tradeBook = function (book) {
          //bookFactory.tradeBook(book).then(function (results) {
            //book.forTrade = true;
          //});
        //}
        
        //$scope.cancelTrade = function (book) {
          //bookFactory.cancelTrade(book._id).then(function (results) {
            //$scope.tradeShelf.splice($scope.tradeShelf.indexOf(results), 1)
          //});
        //}

        //$scope.requestTrade = function (book) {
          //bookFactory.requestTrade(book).then(function (results) {

          //});
        //}
     },
     link: function (scope, element, attrs) {
     }
   };
 });
