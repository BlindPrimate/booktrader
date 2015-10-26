'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TradeSchema = new Schema({
  owner_id: String,
  requester_id: String,
  requested: {type: Boolean, default: false},
  forTrade: {type: Boolean, default: true},
  completed: {type: Boolean, default: false},
  dateCompleted: Date,
  title : String,
  authors : Array,
  thumbnail : String,
  googleId : String,
  isbn : Array,
  datePublished : Date,
  categories : Array,
});

module.exports = mongoose.model('Trade', TradeSchema);
