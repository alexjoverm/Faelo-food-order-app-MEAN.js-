'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderLineSchema = new Schema({
  amount: Number,
  _item: { type: Schema.ObjectId, ref: 'Article' }
});




module.exports = mongoose.model('OrderLine', OrderLineSchema);
