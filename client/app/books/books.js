'use strict';

angular.module('bookbrokerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('books', {
        url: '/books',
        templateUrl: 'app/books/books.html',
        controller: 'BooksCtrl'
      });
  });