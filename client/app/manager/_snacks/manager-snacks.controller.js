'use strict';

angular.module('faeloApp')
  .controller('ManagerSnacksCtrl', function ($scope, $http, ArticlesSvc, UIHandler) {

    $scope.snacks = ArticlesSvc.snacks;

    $scope.$on('ManagerSvc:datesLoaded', function(){
      $scope.snacks = ArticlesSvc.snacks;
    });

    $scope.OpenArticleModal = function(article, mode){
      $scope.openedArticle = article || {};
      var str = (mode === 'add' ? 'Add' : 'Update');

      if(mode === 'add')
        $scope.openedArticle.isSnack = true;

      UIHandler.DialogArticleEdit(str + ' snack', 'info', $scope.SetArticle, $scope.openedArticle, { mode: mode, template_name: 'components/my-modal/modal-article.html'});
    };



    $scope.SetArticle= function(data){

      if(data.options.mode == 'add')
        $http.post('/api/articles/default/', data.item);
      else if(data.options.mode == 'update') {
        // If image is changed, then delete the old one
        if(data.options.delete && $scope.openedArticle.image && $scope.openedArticle.image != '')
          $http.delete('/api/files/' + $scope.openedArticle.image).success(function(){
            console.log(arguments)
          }).error(function(){
            UIHandler.DialogConfirm('Error', 'Error removing from disk the image associated to the Article...', 'error');
          });


        $http.put('/api/articles/default/' + data.item._id, data.item).success(function(){
          $state.go($state.current, {}, {reload: true});
        }).error(function(){
          UIHandler.DialogConfirm('Error', 'Error updating the Article...', 'error');
        });
      }
      else{
        $scope.DeleteArticle(data);
      }

    };

  });
