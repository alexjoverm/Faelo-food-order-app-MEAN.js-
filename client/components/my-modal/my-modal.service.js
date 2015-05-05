angular.module('faeloApp').factory('UIHandler', ['$modal', function($modal){


  var GetIcon = function(type){
    if(type == 'error' || type == 'warning')
      return 'glyphicon glyphicon-warning-sign';
    else if(type == 'success')
      return 'icon-checkmark';
    else if(type == 'info')
      return 'glyphicon glyphicon-info-sign';
  };

  var SetOptions = function(opt, type, template_default){
    var options = opt || {};
    options.icon = options.icon || GetIcon(type);
    options.redirect = options.redirect || false;
    options.size = options.size || 'md'; // 'sm', 'md' o 'lg'
    options.template_name = options.template_name || template_default;

    return angular.copy(options);
  };



  var uiHandler = {};

  // type = [error, warning, success, info]. Determina color y icono

  uiHandler.DialogConfirm = function(header, message, type, options){

    var options = SetOptions(options, type, 'components/my-modal/my-modal.html');

    var modalInstance = $modal.open({
      templateUrl: options.template_name,
      controller: 'ModalContent',
      size: options.size,
      resolve: { data: function(){
        return{
          header: header, msg: message ,
          type: type , options: options,
          buttons: [{
            class: 'btn-default',
            text: 'OK',
            click: function(e) { modalInstance.dismiss(e); }
          }]
        };
      }}
    });
  };

  uiHandler.DialogDelete = function(header, message, type, cb, options){

    var options = SetOptions(options, type, 'components/my-modal/my-modal.html');

    var modalInstance = $modal.open({
      templateUrl: options.template_name,
      controller: 'ModalContent',
      size: options.size,
      resolve: { data: function(){
        return{
          header: header, msg: message ,
          type: type , options: options,
          buttons: [{
              class: 'btn-warning',
              text: 'Delete',
              click: function(e) { modalInstance.close(e); }
            },{
              class: 'btn-default',
              text: 'Cancel',
              click: function(e) { modalInstance.dismiss(e); }
          }]
        };
      }}
    });

    modalInstance.result.then(function(resultData) {
      cb(resultData);
    });
  };


  uiHandler.DialogArticleEdit = function(header, type, cb, item, options){

    var options = SetOptions(options, type, 'components/my-modal/modal-article.html');

    var modalInstance = $modal.open({
      templateUrl: options.template_name,
      controller: 'ModalArticleCtrl',
      backdrop: 'static',
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
