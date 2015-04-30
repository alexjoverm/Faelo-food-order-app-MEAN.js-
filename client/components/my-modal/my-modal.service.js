angular.module('faeloApp').factory('UIHandler', ['$modal', function($modal){


  var GetIcon = function(type){
    if(type == 'error' || type == 'warning')
      return 'glyphicon glyphicon-warning-sign';
    else if(type == 'success')
      return 'icon-checkmark';
    else if(type == 'info')
      return 'glyphicon glyphicon-info-sign';
  }



  var uiHandler = {};

  // type = [error, warning, success, info]. Determina color y icono

  uiHandler.DialogConfirm = function(header, message, type, options){

    var options = options || {};
    options.icon = options.icon || GetIcon(type);
    options.redirect = options.redirect || false;
    options.size = options.size || 'md'; // 'sm', 'md' o 'lg'
    options.template_name = options.template_name || 'components/my-modal/my-modal.html';

    var modalInstance = $modal.open({
      templateUrl: options.template_name,
      controller: 'ModalContent',
      size: options.size,
      resolve: { data: function(){
        return{ header: header, msg: message , type: type , options: options};
      }}
    });
  };


  uiHandler.DialogEdit = function(header, type, cb, item, options){

    var options = options || {};
    options.icon = options.icon || GetIcon(type);
    options.size = options.size || 'md'; // 'sm', 'md' o 'lg'
    options.template_name = options.template_name || 'components/my-modal/my-modal.html';

    var modalInstance = $modal.open({
      templateUrl: options.template_name,
      controller: 'ModalContent',
      size: options.size,
      resolve: { data: function(){
        return{ header: header, type: type , item: item, options: options};
      }}
    });

    modalInstance.result.then(function(resultData) {
      cb(resultData);
    });
  };

  return uiHandler;
}]);
