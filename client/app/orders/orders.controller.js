'use strict';

angular.module('faeloApp')
  .controller('OrdersCtrl', function ($scope, $state, ArticlesSvc, Auth) {

    if(ArticlesSvc.isSelectionEmpty())
      $state.go('articles');

    $scope.dish = null;
    $scope.snacks = ArticlesSvc.selection.snacks;

    if(ArticlesSvc.selection.dish.amount) {
      $scope.dish = ArticlesSvc.dishes[ArticlesSvc.selection.dish.index];
      $scope.dish.amount = ArticlesSvc.selection.dish.amount;
    }



    /**** Total Price *****/
    $scope.vars = {
      total: 0
    };

    for(var i in $scope.snacks)
      $scope.vars.total += $scope.snacks[i].amount * $scope.snacks[i].price;

    if($scope.dish)
      $scope.vars.total += $scope.dish._article.price * $scope.dish.amount;

    $scope.vars.total = +$scope.vars.total.toFixed(2);



    /***** Form *****/
    $scope.user = angular.copy(Auth.getCurrentUser());
    $scope.loggedIn = Auth.isLoggedIn();

    $scope.PerformOrder = function(form){
      $scope.submitted = true;

      if(form.$valid){
        console.log('valid')
        if($scope.loggedIn){
          // Attach the user to the request
        }
        else{
          // Attach the name to the request
        }

      }
    };

  });








