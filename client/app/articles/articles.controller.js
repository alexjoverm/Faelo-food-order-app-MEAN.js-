'use strict';

angular.module('faeloApp')
  .controller('ArticlesCtrl', function ($scope, $http, ArticlesSvc) {

    $scope.selection = ArticlesSvc.selection;

    $http.get('/api/dates/week').success(function(dishes) {

      $scope.dishes = dishes;

      for(var i in $scope.dishes)
        $scope.dishes[i].date = new Date($scope.dishes[i].date);


      var now = new Date();
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

      if($scope.dishes.length > 1 && $scope.dishes[0].date.getTime() == today.getTime()){
        $scope.dishes[0].preText = 'Today, ';
        $scope.dishes[0].visible = true;
      }
      if($scope.dishes.length > 2 && $scope.dishes[1].date.getTime() == tomorrow.getTime())
        $scope.dishes[1].preText = 'Tomorrow, ';

    });


    $http.get('/api/articles/snacks/').success(function(snacks) {
      console.log(snacks)
      for(var i in snacks){
        snacks[i].amount = 0;
        $scope.selection.snacks.push(snacks[i]);
      }

      console.log($scope.selection)
    });


/********  DETAIL MODAL  **********/



    $scope.sum=function(index){
      $scope.selection.snacks[index].amount++;
    };

    $scope.substract=function(index){
      $scope.selection.snacks[index].amount--;
      if($scope.selection.snacks[index].amount < 0) $scope.selection.snacks[index].amount = 0;
    };

});
