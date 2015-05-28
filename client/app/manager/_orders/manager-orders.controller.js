'use strict';

angular.module('faeloApp')
  .controller('ManagerOrdersCtrl', function ($scope, $http, UIHandler, OrdersSvc) {

    $scope.allOrders = OrdersSvc.allOrders;
    $scope.todayOrders = OrdersSvc.todayOrders;
    $scope.tomorrowOrders = OrdersSvc.tomorrowOrders;

    $scope.$on('OrdersSvc:ordersLoaded', function(){
      $scope.allOrders = OrdersSvc.allOrders;
      $scope.todayOrders = OrdersSvc.todayOrders;
      $scope.tomorrowOrders = OrdersSvc.tomorrowOrders;
    });

    // Load orders if they're not loaded
    OrdersSvc.loadOrders();


    $scope.reverse = false;
    $scope.predicate = '';
    $scope.oldPredicate = '';

    $scope.order = function(predicate){
      $scope.oldPredicate = $scope.predicate;
      $scope.predicate = predicate;
      if($scope.oldPredicate == $scope.predicate)
        $scope.reverse = !$scope.reverse;
      else
        $scope.reverse = false;
    };


    $scope.Update = function(order){
      $http.put('/api/orders/' + order._id, order).success(function(){
        console.log('success');
      });
    };

    $scope.OpenDetail = function(order){
      $http.get('/api/orders/' + order._id).success(function(order) {
        UIHandler.DialogDetail('Order Detail', 'info', order);
      });
    };

  });
