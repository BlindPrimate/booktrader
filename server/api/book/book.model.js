'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  owner_id: String,
  forTrade: Boolean,
  title : String,
  authors : Array,
  thumbnail : String,
  googleId : String,
  isbn : Array,
  datePublished : Date,
  categories : Array,
});

module.exports = mongoose.model('Book', BookSchema);
