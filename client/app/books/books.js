'use strict';

angular.module('bookbrokerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('books', {
        url: '/books',
        templateUrl: 'app/books/books.html',
        controller: 'BooksCtrl'
      })
      .state('book', {
        url: '/books/:id',
        templateUrl: 'app/books/book/book.html',
        controller: 'BookCtrl'
      });
  });
