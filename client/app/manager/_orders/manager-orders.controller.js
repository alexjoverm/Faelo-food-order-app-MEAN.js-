'use strict';

angular.module('faeloApp')
  .controller('ManagerOrdersCtrl', function ($scope, $http, UIHandler, OrdersSvc) {

    /***** ORDERS *****/
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


    /***** SORTING *****/
    $scope.reverse = [false, false];
    $scope.predicate = ['', ''];
    $scope.oldPredicate = ['', ''];

    $scope.order = function(predicate, i){
      $scope.oldPredicate[i] = $scope.predicate[i];
      $scope.predicate[i] = predicate;
      if($scope.oldPredicate[i] == $scope.predicate[i])
        $scope.reverse[i] = !$scope.reverse[i];
      else
        $scope.reverse[i] = false;
    };

    /****** TODAY & TOMORROW ******/
    $scope.day = 0; //0: today, 1: tomorrow

    /****** FUNCTIONS *****/
    $scope.Update = function(order){
      $http.put('/api/orders/' + order._id, order).success(function(){
        //console.log('success');
      });
    };

    $scope.OpenDetail = function(order){
      $http.get('/api/orders/' + order._id).success(function(order) {
        UIHandler.DialogDetail('Order Detail', 'info', order);
      });
    };

  });
