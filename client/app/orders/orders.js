'use strict';

angular.module('faeloApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        url: '/orders',
        templateUrl: 'app/orders/orders.html',
        controller: 'OrdersCtrl'
      });
  });
