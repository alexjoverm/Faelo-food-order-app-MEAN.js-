'use strict';

var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var auth = require('../../auth/auth.service');
var router = express.Router();
var ArticleModel = require('../article/article.model');

var done = {
  state: false,
  reason: ''
};
var filepath = '';


console.log(multer);

// Multer object

var mwMulterArticle = multer({
  dest: './uploads/',
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
    done.state = true;
  }
});



// Post processing

router.post('/', auth.hasRole('manager'), mwMulterArticle, function(req, res){

  if(done.state == true){

    console.log('--------- ARTICLE');
    console.log(req);

    // Remove previous file assigned to the article, if exists
    if(req.body.article._id){
      ArticleModel.findById(req.body.article._id, function (err, article) {
        if(err) { return res.send(500, err); }
        if(!article) { return res.send(404); }

        if(article.image && article.image !== ''){
          console.log('-- IMAGE: ' + article.image);
          fs.unlink(article.image, function(err) {
            if (err) res.json(500, err);
            res.json(200, filepath);
          });
        }
        else {
          console.log('-- NO IMAGE FOUND');
          res.json(201, filepath);
        }
      });
    }
    else
      res.json(200, filepath);

  }
  else{
    res.json(415, 'Unsupported media type');
  }
});


module.exports = router;
