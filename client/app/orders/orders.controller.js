'use strict';

angular.module('faeloApp')
  .controller('OrdersCtrl', function ($scope, $state, $filter, ArticlesSvc, Auth, Config) {

    if(ArticlesSvc.isSelectionEmpty())
      $state.go('articles');

    $scope.dish = null;
    $scope.snacks = ArticlesSvc.selection.snacks;

    if(ArticlesSvc.selection.dish.amount) {
      $scope.dish = ArticlesSvc.dishes[ArticlesSvc.selection.dish.index];
      $scope.dish.amount = ArticlesSvc.selection.dish.amount;
    }

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    /**** Order data *****/
    $scope.order = {
      date: new Date(today.getTime()),
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

        // Build up object
        var objRequest = angular.copy($scope.order);

        if(!Auth.isLoggedIn())
          delete objRequest.userId;
        else if(objRequest.name === '')
          delete objRequest.name;

        // Atach date
        objRequest.date = new Date($scope.selectedDate.date.getTime());

      }
    };


    /***** Dates *****/
    $scope.dates = [];

    $scope.dates.push({ str: 'Today, ' + $filter('date')(today, 'EEEE dd'), date: new Date(today.getTime()) });
    today.setDate(today.getDate() + 1);
    $scope.dates.push({ str: 'Tomorrow, ' + $filter('date')(today, 'EEEE dd'), date: new Date(today.getTime()) });

    for(var i=0; i < Config.itemsToDisplay - 2; i++){
      today.setDate(today.getDate() + 1);
      $scope.dates.push({ str: $filter('date')(today, 'EEEE dd'), date: new Date(today.getTime()) });
    }

    for(var i in $scope.dates)
      if($scope.dates[i].date.getTime() == $scope.order.date.getTime())
        $scope.selectedDate = $scope.dates[i];


  });








