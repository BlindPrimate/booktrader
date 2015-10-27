'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Book = require('../book/book.model');

var TradeSchema = new Schema({
  owner: mongoose.Schema.ObjectId,
  requester: mongoose.Schema.ObjectId,
  dateCompleted: Date,
  bookData: {type: mongoose.Schema.ObjectId, ref: 'Book'}
});



module.exports = mongoose.model('Trade', TradeSchema);
