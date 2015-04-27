'use strict';

angular.module('faeloApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    console.log($scope.users);

    $scope.delete = function (user) {
      User.remove({id: user._id});
      angular.forEach($scope.users, function (u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.tabs = [{
        "heading" : "Users",
        "active"  : true,
        "template": "app/admin/partials/tab1.html"
      },
      {
        "heading" : "Orders",
        "active"  : false,
        "template": "app/admin/partials/tab2.html"
      }
    ];
  });
