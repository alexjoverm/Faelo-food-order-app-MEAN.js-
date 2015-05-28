'use strict';

angular.module('faeloApp')
  .factory('OrdersSvc', function($http, $rootScope, socket, Auth) {

    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Add today and tomorrow orders to the arrays
    var processOrderByDates = function(){
      this.todayOrders = [];
      this.tomorrowOrders = [];

      for(var i in this.allOrders){
        this.allOrders[i].date = new Date (this.allOrders[i].date);

        if(this.allOrders[i].date.getTime() == today.getTime())
          this.todayOrders.push(this.allOrders[i]);
        else if(this.allOrders[i].date.getTime() == tomorrow.getTime())
          this.tomorrowOrders.push(this.allOrders[i]);
      }
    };

    // Add or update item in the other arrays
    var socketsCallback = function(event, item){
      if(event == 'created'){
        if(item.date.getTime() == today.getTime())
          this.todayOrders.push(item);
        else if(item.date.getTime() == tomorrow.getTime())
          this.tomorrowOrders.push(item);
      }
      else{
        var itemInToday = _.find(this.todayOrders, {_id: item._id});
        var itemInTomorrow = _.find(this.tomorrowOrders, {_id: item._id});

        if(itemInToday){
          var index = this.todayOrders.indexOf(itemInToday);
          this.todayOrders.splice(index, 1, item);
        }
        else if(itemInTomorrow){
          var index = this.tomorrowOrders.indexOf(itemInTomorrow);
          this.tomorrowOrders.splice(index, 1, item);
        }
      }
    };

    var returnObj =  {

      allOrders: [],
      todayOrders: [],
      tomorrowOrders: [],

      loadOrders: function(){
        Auth.isLoggedInAsync(function(loggedIn) {
          if(loggedIn && Auth.isManager()){
            $http.get('/api/orders/').success(function(orders) {
              this.allOrders = orders;
              processOrderByDates();
              $rootScope.$broadcast('OrdersSvc:ordersLoaded');
            });
          }
        });
      },

      cleanOrders: function(){
        this.allOrders = [];
        this.todayOrders = [];
        this.tomorrowOrders = [];
      }
    };

    $rootScope.$on('auth:logout', this.cleanOrders);
    $rootScope.$on('auth:login', this.loadOrders);

    socket.syncUpdates('order', this.allOrders, socketsCallback, 'date');



    return returnObj

  });
