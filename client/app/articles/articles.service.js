'use strict';

angular.module('faeloApp')
  .factory('ArticlesSvc', function($http, $rootScope, socket) {

    var returnObj =  {
      selection: {
        dish: { index: 0, amount: 0 },
        snacks: []
      },

      dishes: null,
      snacks: null,
      config: {
        someSelected: false
      },

      setSelection: function(){
        this.selection.snacks = _.filter(this.snacks, function(sn){ return sn.amount > 0; })
      },

      resetSelection: function(){
        this.selection.dish.amount = 0;
        this.selection.snacks = [];
        for(var i in this.snacks) this.snacks[i].amount = 0;
      },

      isSelectionEmpty: function(){
        return !(this.selection.snacks.length || this.selection.dish.amount);
      }
    };

    $http.get('/api/dates/week').success(function(dishes) {

      for(var i in dishes)
        dishes[i].date = new Date(dishes[i].date);

      var now = new Date();
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

      if(dishes.length > 1 && dishes[0].date.getTime() == today.getTime()){
        dishes[0].preText = 'Today, ';
        dishes[0].visible = true;
      }
      if(dishes.length > 2 && dishes[1].date.getTime() == tomorrow.getTime())
        dishes[1].preText = 'Tomorrow, ';

      returnObj.dishes = dishes;
      $rootScope.$broadcast('ArticleSvc:dishesLoaded');
    });


    $http.get('/api/articles/snacks/').success(function(snacks) {
      for(var i in snacks)
        snacks[i].amount = 0;

      returnObj.snacks = snacks;
      $rootScope.$broadcast('ArticleSvc:snacksLoaded');
      socket.syncUpdates('snack', returnObj.snacks);
    });




    return returnObj

  });
