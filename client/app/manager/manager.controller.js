'use strict';

angular.module('faeloApp')
  .controller('ManagerCtrl', function ($scope, $http, $timeout, $document, $state, ManagerSvc, socket, UIHandler) {

    $scope.articles = [];
    $scope.dates = [];

    $scope.selectedArticle = null;
    $scope.openedArticle = null;

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    /******   DATA   ******/

    $http.get('/api/articles').success(function(articles, status, headers) {
      $scope.articles = articles;
      socket.syncUpdates('article', $scope.articles);
    });

    $http.get('/api/dates/month').success(function(dates){
      ManagerSvc.parseDates(dates);
      $scope.dates.push(dates);
    });




    /******   CALENDAR   ******/
    $scope.insertDate = function(date){
      if(!ManagerSvc.isDayTaken(date.date)){
        var article = _.find($scope.articles, {_id: date._article});
        var auxDate = {
          date: date.date,
          _article: angular.copy(article)
        };


        $scope.dates[0].push(ManagerSvc.parseDateExternal(auxDate));
        if($scope.dates[0].length == 1)
          $scope.myCalendar.fullCalendar('refetchEvents');

      }
    };

    $scope.calendarDayClick = function(day){
      if(!ManagerSvc.isDayTaken(day)){
        // Can insert
        if($scope.config.mode == 'select' && $scope.selectedArticle) {

          // Add in month
          if ($scope.config.modeButton == 1)
            $http.post('/api/dates/month', {date: day, _article: $scope.selectedArticle._id}).success(function(dates) {

              for(var i in dates)
                $scope.insertDate(dates[i]);

            }).error(function(err, status){
              if(status == 500 && err.code == 11000){
                var msg = 'Some of the dates already exists, only the others will be created.';
                UIHandler.DialogConfirm('Warning', msg, 'warning');
                $state.go($state.current, {}, {reload: true});
              }
            });

          // Add one
          else{
            $http.post('/api/dates/default/', { date: day, _article: $scope.selectedArticle._id }).success(function(date) {
              $scope.insertDate(date);
            }).error(function(err, status){
              console.log(arguments)
                UIHandler.DialogConfirm('Error', 'Something wrong happened with that operation... Try again.', 'error');
            });
          }
        }
      }
      else if($scope.config.mode == 'select'){
        UIHandler.DialogConfirm('Error', 'That day is taken!', 'error');
      }
    };

    $scope.calendarEventClick= function(dateObj){
      if($scope.config.mode == 'delete')
      {
        if($scope.config.modeButton == 1) // Delete month
        {
          $http.delete('/api/dates/month/' + dateObj.start.toISOString()).success(function() {

            console.log(arguments);
            //get dates
            var monthDates = ManagerSvc.getDaysOfMonth(angular.copy(dateObj.start));
            for (var i in monthDates)
              monthDates[i] = monthDates[i].getTime();



            for(var i=0 ; i < $scope.dates[0].length; i++)
              if($scope.dates[0][i] && $scope.dates[0][i].start) {
                if (monthDates.indexOf($scope.dates[0][i].start.getTime()) >= 0) {
                  $scope.dates[0].splice(i, 1);
                  i--;
                }
              }



          }).error(function(err, status){
            console.log(arguments)
              UIHandler.DialogConfirm('Error', 'Error deleting...', 'error');
          });
        }
        // Delete one
        else{
          $http.delete('/api/dates/one/'+ dateObj.start.toISOString()).success(function() {

            console.log(arguments)
            var i = _.findIndex($scope.dates[0], { start: dateObj.start });
            if( i !== -1 )
              $scope.dates[0].splice(i, 1);

          }).error(function(err, status){
            console.log(arguments)
            UIHandler.DialogConfirm('Error', 'Error deleting...', 'error');
          });
        }
      }
    };


    // Limit months that a user can navigate through (1 before, 2 after)
    $scope.calendarViewRender = function(view, element){
      var limitBefore = new Date(now.getFullYear(), now.getMonth() - 1, 2);
      var limitAfter = new Date(now.getFullYear(), now.getMonth() + 3, 0);

      if(view.start < limitBefore)
        jQuery('.fc-button-prev').addClass("fc-state-disabled");
      else
        jQuery('.fc-button-prev').removeClass("fc-state-disabled");

      if(view.end > limitAfter)
        jQuery('.fc-button-next').addClass("fc-state-disabled");
      else
        jQuery('.fc-button-next').removeClass("fc-state-disabled");
    };


    /******   UI   ******/

    $scope.changeMode = function(mode){
      $scope.config.mode = mode;
      $scope.config.modeButton = 0;
      $scope.unsetSelected();
    };

    $scope.changeModeButton = function(mode){
      if(mode == $scope.config.modeButton)
        $scope.config.modeButton = 0;
      else
        $scope.config.modeButton = mode;
    };

    $scope.setSelected = function(article){
      $scope.unsetSelected();
      $scope.selectedArticle = article;
      $scope.selectedArticle.selected = true;
      $scope.config.mode = 'select';
    };

    $scope.unsetSelected = function(){
      if($scope.selectedArticle)
        delete $scope.selectedArticle.selected;
      $scope.selectedArticle = null;
    };





    $scope.config = {

      mode: 'select',
      modeButton: 0, // 1 for month and 2 for from or times

      calendar:{
        height: 500,
        editable: false,
        firstDay: 1,
        selectable: true,
        selectOverlap: false,
        dayClick: $scope.calendarDayClick,
        eventClick: $scope.calendarEventClick,
        viewRender: $scope.calendarViewRender
      }
    };



    /***** ARTICLES *****/

    $scope.DeleteArticle= function(data){
      console.log(arguments)
      $http.delete('/api/articles/'+data.item._id).success(function(){
        $state.go($state.current, {}, {reload: true});
      }).error(function(){
        UIHandler.DialogConfirm('Error', 'Error deleting the Article...', 'error');
      });

      $http.delete('/api/files/' + $scope.openedArticle.image).success(function(){
        console.log(arguments)
      }).error(function(){
        UIHandler.DialogConfirm('Error', 'Error removing from disk the image associated to the Article...', 'error');
      });
    };


    $scope.SetArticle= function(data){

      if(data.options.mode == 'add')
        $http.post('/api/articles', data.item);
      else if(data.options.mode == 'update') {
        if(data.options.delete && $scope.openedArticle.image && $scope.openedArticle.image != '')
          $http.delete('/api/files/' + $scope.openedArticle.image).success(function(){
            console.log(arguments)
          }).error(function(){
            UIHandler.DialogConfirm('Error', 'Error removing from disk the image associated to the Article...', 'error');
          });


        $http.put('/api/articles/' + data.item._id, data.item).success(function(){
          $state.go($state.current, {}, {reload: true});
        }).error(function(){
          UIHandler.DialogConfirm('Error', 'Error updating the Article...', 'error');
        });
      }
      else{
        var msg = 'If you delete the article, also all the dates assigned will be deleted. <p>Do you want to go on?</p>';
        UIHandler.DialogDelete('Delete', msg, 'warning', function(){ $scope.DeleteArticle(data); });
      }

    };

    $scope.OpenArticleModal = function(article, mode){
      $scope.openedArticle = article || {};
      var str = (mode === 'add' ? 'Add' : 'Update');
      UIHandler.DialogArticleEdit(str + ' article', 'info', $scope.SetArticle, $scope.openedArticle, { mode: mode, template_name: 'components/my-modal/modal-article.html'});
    };




      /*****  DESTRUCTORS && EVENTS  *****/
      $document.on('keyup', function(event){
        if(event.keyCode == 16){
          $scope.$apply(function(){ $scope.config.modeButton = 0; });
        }
      });

      $document.on('keydown', function(event){
        if(event.keyCode == 16){
          $scope.$apply(function(){ $scope.config.modeButton = 1; });
        }
      });

      $scope.$on('$destroy', function () {
        $document.off('keyup');
        $document.off('keydown');
        socket.unsyncUpdates('article');
      });


  });
