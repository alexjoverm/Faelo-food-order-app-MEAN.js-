'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  image: String,
  title: String,
  description: String,
  price: {type: Number},
  isSnack: { type: Boolean, default: false }
});

module.exports = mongoose.model('Article', ArticleSchema);
