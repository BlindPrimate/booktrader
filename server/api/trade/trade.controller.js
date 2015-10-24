'use strict';

var _ = require('lodash');
var Trade = require('./trade.model');


/*
 * User-specific Trades
 */


// Get list of trades by user id
exports.userTrades = function(req, res) {
  var userId = req.user.id;
  Trade.find({
    owner_id: userId
  }, function (err, trades) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(trades);
  });
};

exports.completedTradesByUser = function(req, res) {
  var userId = req.user.id;
  Trade.find({
        owner_id: userId,
        tradeStatus: 'completed'
  }, function (err, trades) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(trades);
  });
};


exports.tradeRequestsByUser = function(req, res) {
  var userId = req.user.id;
  Trade.find({
    owner_id: userId,
    tradeStatus: 'requested'
  }, function (err, trades) {
    console.log(trades);
    if(err) { return handleError(res, err); }
    return res.status(200).json(trades);
  });
};


/*
 * All trades
 */

// Get list of trades
exports.index = function(req, res) {
  Trade.find(function (err, trades) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(trades);
  });
};



// Get a single trade
exports.show = function(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    if(err) { return handleError(res, err); }
    if(!trade) { return res.status(404).send('Not Found'); }
    return res.json(trade);
  });
};

// Creates a new trade in the DB.
exports.create = function(req, res) {
  Trade.create(req.body, function(err, trade) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(trade);
  });
};

// Updates an existing trade in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Trade.findById(req.params.id, function (err, trade) {
    if (err) { return handleError(res, err); }
    if(!trade) { return res.status(404).send('Not Found'); }
    var updated = _.merge(trade, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(trade);
    });
  });
};

// Deletes a trade from the DB.
exports.destroy = function(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    if(err) { return handleError(res, err); }
    if(!trade) { return res.status(404).send('Not Found'); }
    trade.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

/*
 * Pending Trades
 */

// Get list of trades
exports.pendingIndex = function(req, res) {
  Trade.find({tradeStatus: 'pending'}, function (err, trades) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(trades);
  });
};


/*
 * Requested Trades
 */

// Get list of trades
exports.requestedIndex = function(req, res) {
  Trade.find({tradeStatus: 'requested'}, function (err, trades) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(trades);
  });
};



/*
 * Completed Trades
 */

// Get list of trades
exports.completedIndex = function(req, res) {
  Trade.find({tradeStatus: 'completed'}, function (err, trades) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(trades);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
