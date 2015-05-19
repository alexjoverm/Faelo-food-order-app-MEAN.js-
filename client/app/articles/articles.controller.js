'use strict';

angular.module('faeloApp')
  .controller('ArticlesCtrl', function ($scope, $http) {

    $http.get('/api/dates/week').success(function(dishes) {

      $scope.dishes = dishes;
      $scope.selection = {
        dish: { index: 0, amount: 0 },
        snacks: []
      };

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

});
