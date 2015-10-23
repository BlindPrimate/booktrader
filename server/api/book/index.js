'use strict';

var express = require('express');
var controller = require('./book.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);                                      // get all books
router.get('/bookshelf', auth.isAuthenticated(), controller.bookshelf); // get current bookshelf
router.get('/trades', auth.isAuthenticated(), controller.trades); // get current bookshelf
router.post('/bookshelf', auth.isAuthenticated(), controller.create);  // add book to bookshelf
router.get('/:id', controller.show);                                  // get book by id
router.get('/search/:term', auth.isAuthenticated(), controller.search); // search for books on google api
router.get('/google/:id', auth.isAuthenticated(), controller.searchSingle); // search for books on google api
router.put('/:id', controller.update);                                // modify books document
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
