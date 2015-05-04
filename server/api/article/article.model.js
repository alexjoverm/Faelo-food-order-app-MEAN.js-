'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  image: {type: String, default: 'http://placehold.it/350x232'},
  title: String,
  description: String,
  price: {type: Number}
});

module.exports = mongoose.model('Article', ArticleSchema);
