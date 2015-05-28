'use strict';

angular.module('faeloApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};
    $scope.currentUser = Auth.getCurrentUser();
    $scope.messageName = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.changeName = function(form){
      $scope.submittedName = true;
      if(form.$valid){
        User.changeName({ id: $scope.currentUser._id }, {name: $scope.user.name }, function(user) {
          $scope.messageName.msg = 'Name changed successfully';
          $scope.messageName.class = 'text-success';
          $scope.currentUser.name = $scope.user.name;
        }, function(err) {
          $scope.messageName.msg = 'Something wrong happened when saving the name';
          $scope.messageName.class = 'text-danger';
        });
      }
    };

    $http.get('/api/orders/me/all').success(function(orders) {
      for (var i in orders)
        orders[i].date = new Date(orders[i].date);
      $scope.orders = orders;
    });

  });
