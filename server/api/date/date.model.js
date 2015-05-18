'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DateSchema = new Schema({
  date: {type: Date, unique : true, dropDups: true},
  _article: { type: Schema.ObjectId, ref: 'Article' }
});

DateSchema
  .path('_article')
  .validate(function(article) {
    return typeof article.isSnack === 'undefined' || article.isSnack === false;
  }, 'The article should be a dish, not a snack');




module.exports = mongoose.model('Date', DateSchema);
