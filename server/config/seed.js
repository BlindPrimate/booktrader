/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Book = require('../api/book/book.model');
var Trade = require('../api/trade/trade.model');


Book.find({}).remove(function () {

});

Trade.find({}).remove(function () {

});


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
  }, {
    provider: 'local',
    role: 'Test User',
    name: 'User A',
    email: 'userA@test.com',
    password: 'userA',
  }, {
    provider: 'local',
    role: 'Test User',
    name: 'User B',
    email: 'userB@test.com',
    password: 'userB',
  }, function() {
      console.log('finished populating users');
    }
  );
});
