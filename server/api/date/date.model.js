'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DateSchema = new Schema({
  date: {type: Date, unique : true, dropDups: true},
  _article: { type: Schema.ObjectId, ref: 'Article' }
});






module.exports = mongoose.model('Date', DateSchema);
