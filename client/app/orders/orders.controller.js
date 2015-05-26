'use strict';

angular.module('faeloApp')
  .controller('OrdersCtrl', function ($scope, $state, $filter, $http, ArticlesSvc, Auth, Config, UIHandler) {

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
      time: '',
      amount: 0,
      _user: null,
      name: '',
      _items: []
    };

    $scope.loggedIn = Auth.isLoggedIn();
    if($scope.loggedIn) {
      $scope.order._user = angular.copy(Auth.getCurrentUser());
      $scope.order.name = $scope.order._user.name;
    }


    // Attach user
    if(Auth.isLoggedIn())
      $scope.order._user = Auth.getCurrentUser()._id;

    // Calculate total price and attach
    for(var i in $scope.snacks)
      $scope.order.amount += $scope.snacks[i].amount * $scope.snacks[i].price;

    if($scope.dish)
      $scope.order.amount += $scope.dish._article.price * $scope.dish.amount;

    $scope.order.amount = +$scope.order.amount.toFixed(2);

    // Attach dishes and snacks
    if($scope.dish) {
      $scope.order.date = new Date($scope.dish.date.getTime());
      $scope.order._items.push({ amount: $scope.dish.amount, _item: $scope.dish._article._id });
    }

    for(var i in $scope.snacks)
      $scope.order._items.push({amount: $scope.snacks[i].amount, _item: $scope.snacks[i]._id });





    /***** Form *****/
    $scope.PerformOrder = function(form){
      $scope.submitted = true;

      if(form.$valid){

        // Build up object
        var objRequest = angular.copy($scope.order);

        if(!Auth.isLoggedIn())
          delete objRequest._user;

        // Atach date
        objRequest.date = new Date($scope.selectedDate.date.getTime());
        objRequest.time = objRequest.time.replace('.', ':');

        $http.post('/api/orders/', objRequest).success(function(order) {

          console.log(order);
          var header = 'Order booked!';
          var msg = '<p>Your order has been booked successfully!! Come and pick up your meal: </p>' +
              '<h4 class="text-center">' + $scope.selectedDate.str + ' at ' + order.time;

          UIHandler.DialogConfirm(header, msg, 'success', {backdrop: 'static', callback: $scope.redirect});
        }).error(function(err){
          var msg = "Something wrong happened, please try again";
          UIHandler.DialogConfirm('Error', msg, 'error');
        });
      }
    };

    $scope.redirect = function(){
      ArticlesSvc.resetSelection();
      $state.go('articles');
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








