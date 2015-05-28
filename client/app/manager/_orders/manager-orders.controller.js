'use strict';

angular.module('faeloApp')
  .controller('ManagerOrdersCtrl', function ($scope, OrdersSvc) {

    $scope.allOrders = OrdersSvc.allOrders;
    $scope.todayOrders = OrdersSvc.todayOrders;
    $scope.tomorrowOrders = OrdersSvc.tomorrowOrders;

    $scope.$on('OrdersSvc:ordersLoaded', function(){
      $scope.allOrders = OrdersSvc.allOrders;
      $scope.todayOrders = OrdersSvc.todayOrders;
      $scope.tomorrowOrders = OrdersSvc.tomorrowOrders;
    });

  });
