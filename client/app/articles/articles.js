'use strict';

angular.module('faeloApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('articles', {
        url: '/',
        templateUrl: 'app/articles/articles.html',
        controller: 'ArticlesCtrl'
      });
  });