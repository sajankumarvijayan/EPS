/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/users/user.model');
var bcrypt = require('bcrypt-nodejs');

bcrypt.hash("admin@123", null,null, function(err, hash) {
  User.find({}).remove(function() {
    User.create({
      name : 'Admin',
      email: 'admin@admin.com',
      password : hash,
      role:'Admin_Role'
  });
});

});
