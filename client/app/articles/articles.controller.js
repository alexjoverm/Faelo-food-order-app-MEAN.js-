'use strict';

angular.module('faeloApp')
  .controller('ArticlesCtrl', function ($scope, ArticlesSvc, UIHandler) {

    $scope.selection = ArticlesSvc.selection;
    $scope.dishes = ArticlesSvc.dishes;
    $scope.snacks = ArticlesSvc.snacks;


    $scope.$on('ArticleSvc:dishesLoaded', function(){
      $scope.dishes = ArticlesSvc.dishes;
    });
    $scope.$on('ArticleSvc:snacksLoaded', function(){
      $scope.snacks = ArticlesSvc.snacks;
    });




/********  DETAIL MODAL  **********/
    $scope.OpenDetail = function(article){
      var msg = '<img class="img-responsive" src="/uploads/' + article.image + '"/>';
      msg += '<p class="padding-v text-m">'+ article.description +'</p><h4>Price: '+ article.price +' €</h4>';
      UIHandler.DialogConfirm(article.title, msg,'info');
    };


    $scope.sum=function(index){
      console.log()
      $scope.snacks[index].amount++;
    };

    $scope.substract=function(index){
      $scope.snacks[index].amount--;
      if($scope.snacks[index].amount < 0) $scope.snacks[index].amount = 0;
    };

});
