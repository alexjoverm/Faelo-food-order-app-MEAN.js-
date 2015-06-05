'use strict';

var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var auth = require('../../auth/auth.service');
var router = express.Router();
var ArticleModel = require('../article/article.model');
var config = require('../../config/environment')

var done = {
  state: false,
  reason: ''
};
var filepath = '';
var filename = '';
var filedir = '';


if(config.env === 'production')
  filedir = config.root + '/public';
else
  filedir = './client';


var mwMulterArticle = multer({
  dest: filedir + '/uploads',
  rename: function (fieldname, filename) { return filename+Date.now(); },
  onFileUploadStart: function (file) {
    if(file.extension != 'png' && file.extension != 'jpg' && file.extension != 'jpeg') {
      done.state = false;
      done.reason = 'filetype';
      return false;
    }

  },
  onFileUploadComplete: function (file) {
    filepath = file.path;
    filename = file.name;
    done.state = true;
  }
});




// Post processing

router.post('/', auth.hasRole('manager'), mwMulterArticle, function(req, res){

  if(done.state == true){

    // Remove previous file assigned to the article, if exists
    if(req.body.article._id){
      ArticleModel.findById(req.body.article._id, function (err, article) {
        if(err) { return res.send(500, err); }
        if(!article) { return res.send(404); }

        fs.unlink(article.image, function(err) {
          if (err) res.json(500, err);
          res.json(200, filename);
        });

      });
    }
    else
      res.json(200, filename);

  }
  else{
    res.json(415, 'Unsupported media type');
  }
});

router.delete('/:filename', auth.hasRole('manager'), function(req, res){
    fs.unlink(req.app.get('appPath') + '/uploads/' + req.params.filename, function(err) {
      if (err) res.json(500, err);
      res.json(200, filename);
    });
});


module.exports = router;
