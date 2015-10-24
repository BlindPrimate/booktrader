'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TradeSchema = new Schema({
  owner_id: String,
  tradedTo: String,
  title : String,
  authors : Array,
  thumbnail : String,
  googleId : String,
  isbn : Array,
  datePublished : Date,
  categories : Array,
});

module.exports = mongoose.model('Trade', TradeSchema);
