'use strict';

angular.module('faeloApp')
  .controller('ArticlesCtrl', function ($scope, $state, $http, ArticlesSvc, UIHandler) {

    $scope.selection = ArticlesSvc.selection;
    $scope.dishes = ArticlesSvc.dishes;
    $scope.snacks = ArticlesSvc.snacks;
    $scope.config = ArticlesSvc.config;


    $scope.$on('ArticleSvc:dishesLoaded', function(){
      $scope.dishes = ArticlesSvc.dishes;
    });
    $scope.$on('ArticleSvc:snacksLoaded', function(){
      $scope.snacks = ArticlesSvc.snacks;
    });


    $scope.checkForSelecteds = function(){
      var found = _.find($scope.snacks, function(sn){ return sn.amount > 0; })
      $scope.config.someSelected = (typeof found !== "undefined" || $scope.selection.dish.amount > 0);
    };

    $scope.$watch('selection.dish.amount', function(){
      $scope.checkForSelecteds();
    });

    /***** DETAIL MODAL *****/
    $scope.OpenDetail = function(article){
      var msg = '<img class="img-responsive" src="/uploads/' + article.image + '"/>';
      msg += '<p class="padding-v text-m">'+ article.description +'</p><h4>Price: '+ article.price +' €</h4>';
      UIHandler.DialogConfirm(article.title, msg,'info');
    };


    /***** SNACKS *****/
    $scope.sum=function(index){
      $scope.snacks[index].amount++;
      $scope.checkForSelecteds();
    };

    $scope.substract=function(index){
      $scope.snacks[index].amount--;
      if($scope.snacks[index].amount < 0) $scope.snacks[index].amount = 0;
      $scope.checkForSelecteds();
    };


    /****** ORDER ******/
    $scope.DoOrder = function(){
      ArticlesSvc.setSelection();
      $state.go('orders');
    };


});
