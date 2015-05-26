'use strict';

angular.module('faeloApp')
  .controller('OrdersCtrl', function ($scope, $state, $filter, ArticlesSvc, Auth) {

    if(ArticlesSvc.isSelectionEmpty())
      $state.go('articles');

    $scope.dish = null;
    $scope.snacks = ArticlesSvc.selection.snacks;

    if(ArticlesSvc.selection.dish.amount) {
      $scope.dish = ArticlesSvc.dishes[ArticlesSvc.selection.dish.index];
      $scope.dish.amount = ArticlesSvc.selection.dish.amount;
    }



    /**** Order data *****/
    $scope.order = {
      date: new Date(),
      pickupTime: '',
      totalPrice: 0,
      userId: null,
      name: '',
      items: []
    };

    console.log(Auth.getCurrentUser()._id)

    // Attach user
    if(Auth.isLoggedIn())
      $scope.order.userId = Auth.getCurrentUser()._id;

    // Calculate total price and attach
    for(var i in $scope.snacks)
      $scope.order.totalPrice += $scope.snacks[i].amount * $scope.snacks[i].price;

    if($scope.dish)
      $scope.order.totalPrice += $scope.dish._article.price * $scope.dish.amount;

    $scope.order.totalPrice = +$scope.order.totalPrice.toFixed(2);

    // Attach dishes and snacks
    if($scope.dish) {
      $scope.order.date = new Date($scope.dish.date.getTime());
      $scope.order.items.push($scope.dish._article._id);
    }

    for(var i in $scope.snacks)
      $scope.order.items.push($scope.snacks[i]._id);

    console.log($scope.order)




    /***** Form *****/
    $scope.user = angular.copy(Auth.getCurrentUser());
    $scope.loggedIn = Auth.isLoggedIn();

    $scope.PerformOrder = function(form){
      $scope.submitted = true;

      if(form.$valid){



      }
    };

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 5);

    $scope.dates = {
      min: today,
      max: tomorrow
    };

    $scope.dateConfig = {
      startingDay: 1
    };



    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };


  });








