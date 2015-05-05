'use strict';

angular.module('faeloApp')
  .controller('FileUploadCtrl', function($scope, Upload, UIHandler){

    $scope.upload = function (files) {

      if(!$scope.$parent.data.item) $scope.$parent.data.item = {};

      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          Upload.upload({
            url: '/api/files/',
            fields: {
              'article': $scope.$parent.data.item
            },
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log(progressPercentage);
          }).success(function (data, status, headers, config) {
            console.log(arguments);
            $scope.$parent.data.item.image = data;
          }).error(function(err, code){
            if(code == 415)
              UIHandler.DialogConfirm('Error', 'Wrong file type. Use only .jpg/.jpeg or .png < 1 MB', 'error');
            console.log(arguments);
          });
        }
      }
    };

  });
