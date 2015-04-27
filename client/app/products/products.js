'use strict';

angular.module('faeloApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl'
      });
  });