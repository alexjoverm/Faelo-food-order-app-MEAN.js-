'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  date: Date,
  time: String,
  name: String,
  amount: Number,
  _items: [{ type: Schema.ObjectId, ref: 'OrderLine' }],
  _user: { type: Schema.ObjectId, ref: 'User' },
  readed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

OrderSchema.pre('save', function(next){
  this.amount = +this.amount.toFixed(2);
  next();
});



module.exports = mongoose.model('Order', OrderSchema);
