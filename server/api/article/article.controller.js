'use strict';

var _ = require('lodash');
var Article = require('./article.model');
var DateModel = require('../date/date.model');

// Get list of articles
exports.index = function(req, res) {
  Article.find(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.json(200, articles);
  });
};

// Get a single article
exports.show = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  Article.create(req.body, function(err, article) {
    if(err) { return handleError(res, err); }
    return res.json(201, article);
  });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    var updated = _.merge(article, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }


      // IF article.image !== updated.image, THEM REMOVE IMAGE FROM DISK

      return res.json(200, article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }

    // Remove dates where the article is assigned
    DateModel.find({_article: article._id}).remove(function(err, many) {
      if(err) { return handleError(res, err); }
      console.log(many + ' removed');
      article.remove(function(err) {
        if(err) { return handleError(res, err); }

        // REMOVE IMAGE FROM DISK


        return res.send(204);
      });
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
