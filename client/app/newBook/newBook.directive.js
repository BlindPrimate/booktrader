'use strict';

angular.module('bookbrokerApp')
  .directive('newBook', function (bookFactory) {
    return {
      templateUrl: 'app/newBook/newBook.html',
      restrict: 'E',
      scope: {},
      controller: function ($scope, bookFactory, $q) {

        $scope.search = {
          term: '',
          results: []
        }

        $scope.$watch('search.term', function () {
          bookFactory.searchBooks('good omens').then(function (searchResult) {
            $scope.search.results = searchResult.data;
          });
        });


        $scope.addBook = function (bookObj) {
          var book = {
            title: bookObj.title,
            authors: bookObj.authors,
            categories: bookObj.categories,
            datePublished: bookObj.publishedDate,
            isbn: bookObj.industryIdentifiers,
            googleId: bookObj.googleId
          }

          bookFactory.saveBook(book).then(function () {
            bookObj.onShelf = true;
          }, function () {

          });
        }
      },
      link: function (scope, element, attrs) {

      }
    };
  });
