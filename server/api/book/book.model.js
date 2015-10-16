'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  authors: Array,
  datePublished: Date,
  categories: Array,
  isbn: Array,
  googleId: String
});

module.exports = mongoose.model('Book', BookSchema);
