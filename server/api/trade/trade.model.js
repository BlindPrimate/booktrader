'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TradeSchema = new Schema({
  current: Array,
  previous: Object,
});

module.exports = mongoose.model('Trade', TradeSchema);
