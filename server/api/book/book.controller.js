'use strict';

var _ = require('lodash');
var Book = require('./book.model');
var User = require('../user/user.model');
var request = require('request');
var async = require('async');

// Get list of books
exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(books);
  });
};

// Get list of books
exports.trades = function(req, res) {
  Book.find({forTrade: true}, function (err, books) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(books);
  });
};

// Get list of trade requests for user
exports.requests = function(req, res) {
  Book.find({
    owner: req.user.id,
    requested: true,
  }, function (err, books) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(books);
  });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    return res.json(book);
  });
};


// search for books on google api and compile with local database
exports.search = function (req,res) {
  request.get({
    url: 'https://www.googleapis.com/books/v1/volumes?q=' + req.params.term,
    json: true
  }, function (error, response, body) {
    var books = _.map(body.items, function (item) {
      var book = item.volumeInfo;
      book.googleId = item.id;
      return book;
    });

    async.map(books, function (book, callback) {
      Book.findOne({
        owner: req.user.id,
        googleId: book.googleId
      }, function (err, user) {
        if (user) {
          book.onShelf = true;
        } else {
          book.onShelf = false;
        }
        callback(err, book);
      });
    }, function (err, results) {
      return res.status(201).json(results);
    });
  });
}

exports.searchSingle = function (req,res) {
  Book.findOne({_id: req.params.id}, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    request.get({
      url: 'https://www.googleapis.com/books/v1/volumes/' + book.googleId,
      json: true
    }, function (error, response, body) {
      var compiled = book.toObject();
      _.merge(compiled, body.volumeInfo);
      compiled.description = compiled.description.replace(/<\/?[^>]+>/gi, '');
      return res.status(201).json(compiled);
    });
  });
}

exports.bookshelf = function (req, res) {
  Book.find({owner: req.user.id}, function (err, shelf) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(shelf);
  });
}

// Creates a new book in the DB.
exports.create = function(req, res) {
  req.body.owner = req.user.id;
  Book.create(req.body, function(err, book) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(book);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Book.findById(req.params.id, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    var updated = _.merge(book, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(book);
    });
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
