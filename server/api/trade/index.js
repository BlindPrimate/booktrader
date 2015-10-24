'use strict';

var express = require('express');
var controller = require('./trade.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


// user-specific trades
router.get('/me', auth.isAuthenticated(), controller.userTrades);
router.get('/completed/me', auth.isAuthenticated(), controller.completedTradesByUser);
router.get('/requested/me', auth.isAuthenticated(), controller.tradeRequestsByUser);

// pending trades - no current user trade requests made
router.get('/pending', controller.pendingIndex);

// completed trades 
router.get('/completed', controller.completedIndex);

//request trades
router.get('/requested', controller.requestedIndex);


// all trades 
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);



module.exports = router;
