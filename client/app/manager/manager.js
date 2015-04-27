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
      });
  });
