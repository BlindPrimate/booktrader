'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = require('../user/user.model');
var Trade = require('../trade/trade.model');



var BookSchema = new Schema({
  owner: {type: mongoose.Schema.ObjectId, ref: 'User'},
  title : String,
  authors : Array,
  thumbnail : String,
  googleId : String,
  isbn : Array,
  datePublished : Date,
  categories : Array,
  requester: {type: mongoose.Schema.ObjectId, ref: 'User'},
  requested: {type: Boolean, default: false},
  forTrade: {type: Boolean, default: false},
  completed: {type: Boolean, default: false},
});


BookSchema.pre('save', function (next) {
  var Book = this;


  // if book trade is completed create new trade document in trade db
  if (Book.completed) {
    Trade.create({
      owner: Book.owner,
      requester: Book.requester,
      dateCompleted: Date.now(),
      bookData: Book._id,
    }, function (err, completedTrade) {
      completedTrade.save();
    });
    Book.completed = false;
    Book.requester = null;
  }

  User.findById(this.owner, function (err, user) {
    if (!user) {
      next(this);
    } else if (user.bookshelf.indexOf(Book._id) === -1) {
      user.bookshelf.push(Book._id);
      user.save();
    }
    next();
  });
});


BookSchema.pre('remove', function (next) {
  var Book = this;
  User.findById(this.owner, function (err, user) {
    if (!user) {
      next(this);
    }
    user.bookshelf.pull(Book._id);
    user.save();
    next();
  });
});


module.exports = mongoose.model('Book', BookSchema);
