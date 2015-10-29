'use strict';

angular.module('bookbrokerApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    // delete 
    $scope.userA = {
      email: 'userA@test.com',
      password: 'userA'
    }
    $scope.userB = {
      email: 'userB@test.com',
      password: 'userB'
    }
    $scope.testLogin = function (user) {
      Auth.login({
        email: user.email,
        password: user.password
      })
      .then( function() {
        // Logged in, redirect to home
        $location.path('/');
      })
      .catch( function(err) {
        $scope.errors.other = err.message;
      });
    }
    //



    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
