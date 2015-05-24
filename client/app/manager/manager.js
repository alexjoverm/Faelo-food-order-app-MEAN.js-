'use strict';

angular.module('faeloApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('manager', {
        url: '/manager',
        templateUrl: 'app/manager/manager.html',
        controller: 'ManagerCtrl',
        authenticate: true,
        role: 'manager'
      })
      .state('manager-snacks', {
        url: '/manager-snacks',
        templateUrl: 'app/manager/_snacks/manager-snacks.html',
        controller: 'ManagerSnacksCtrl',
        authenticate: true,
        role: 'manager'
      })
      .state('manager-orders', {
        url: '/manager-orders',
        templateUrl: 'app/manager/manager-orders.html',
        controller: 'ManagerOrdersCtrl',
        authenticate: true,
        role: 'manager'
      });
  });
