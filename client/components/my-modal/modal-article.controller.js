'use strict';

angular.module('faeloApp')
  .controller('ModalArticleCtrl', function($scope, $modalInstance, data, Upload, UIHandler){

    $scope.data = angular.copy(data);

    if($scope.data.item.image)
      $scope.data.item.image = {name: $scope.data.item.image};


    $scope.submit = function(form){
      $scope.submitted = true;

      // We use && $scope.data.item.image.lastModified to check if the image has change
      if(form.$valid) {

        if($scope.data.item.image.lastModified)
          Upload.upload({
            url: '/api/files/',
            fields: {
              'article': $scope.data.item
            },
            file: $scope.data.item.image
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log(progressPercentage);
          }).success(function (data, status, headers, config) {
            console.log(arguments);
            $scope.data.item.image = data.replace(/"/g, "");

            $scope.data.options.delete = true;
            $modalInstance.close($scope.data);

          }).error(function(err, code){
            if(code == 415)
              UIHandler.DialogConfirm('Error', 'Wrong file type. Use only .jpg/.jpeg or .png < 1 MB', 'error');
            console.log(arguments);
          });
        else{
          $scope.data.item.image = $scope.data.item.image.name;
          $modalInstance.close($scope.data);
        }



      }
    };

    $scope.setImage = function(files){
      if (files && files.length)
        $scope.data.item.image = files[0];
    };

  });
