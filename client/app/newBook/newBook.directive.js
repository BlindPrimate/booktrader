'use strict';

angular.module('bookbrokerApp')
  .directive('newBook', function (googleBooks) {
    return {
      templateUrl: 'app/newBook/newBook.html',
      restrict: 'E',
      scope: {},
      controller: function ($scope, bookFactory) {
        $scope.book = {
          title: '',
          category: '',
          isbn: '',
        }

        $scope.search = {
          term: '',
          results: []
        }

        $scope.$watch('search.term', function () {
          googleBooks.bookSearch('good omens').then(function (searchResult) {
            $scope.search.results = searchResult.data.items;
          });
        });


        $scope.addBook = function (bookObj) {
          var book = {
            title: bookObj.volumeInfo.title,
            authors: bookObj.volumeInfo.authors,
            categories: bookObj.volumeInfo.categories,
            datePublished: bookObj.volumeInfo.publishedDate,
            isbn: bookObj.volumeInfo.industryIdentifiers
          }
          bookFactory.saveBook(book).then(function () {
            
          }, function () {

          });
        }


      },
      link: function (scope, element, attrs) {

      }
    };
  });
