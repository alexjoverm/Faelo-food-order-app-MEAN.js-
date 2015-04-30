'use strict';

angular.module('faeloApp')
  .controller('ModalContent',['$scope', '$modalInstance', 'data', function($scope, $modalInstance, data) {

    $scope.data = data;

    $scope.submit = function(form){

    }


  }]);
