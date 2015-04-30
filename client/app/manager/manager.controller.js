'use strict';

angular.module('faeloApp')
  .controller('ManagerCtrl', function ($scope, $http, socket, UIHandler) {

    $scope.articles = [];

    $scope.calendarArticles = [];

    $http.get('/api/articles').success(function(article, status, headers) {
      $scope.articles = article;
      console.log(arguments)
      socket.syncUpdates('article', $scope.articles);
    });


    $scope.calendarDayClick = function(){
      console.log('DayClick');
      console.log(arguments);
    };

    $scope.calendarEventDrop= function(){
      console.log('EventDrop');
      console.log(arguments);
    };

    $scope.calendarEventClick= function(){
      console.log('EventClick');
      console.log(arguments);
    };

    $scope.calendarViewRender= function(){
      console.log('ViewRender');
      console.log(arguments);
    };


    $scope.config = {
      calendar:{
        height: 500,
        editable: true,
        firstDay: 1,
        selectable: true,
        selectOverlap: false,
        dayClick: $scope.calendarDayClick,
        eventDrop: $scope.calendarEventDrop,
        eventClick: $scope.calendarEventClick,
        viewRender: $scope.calendarViewRender
      }
    };


    $scope.AddArticle= function(data){
      console.log(arguments);
      if(data.options.mode == 'add')
        $http.post('/api/articles', data.item);
      else
        $http.put('/api/articles/'+data.item._id, data.item);
    };

    $scope.OpenArticleModal = function(article, mode){
      var article = article || {};
      var str = (mode === 'add' ? 'Add' : 'Update');
      UIHandler.DialogEdit(str + ' article', 'info', $scope.AddArticle, article, { mode: mode, template_name: 'components/my-modal/modal-article.html'});
    };




  });
