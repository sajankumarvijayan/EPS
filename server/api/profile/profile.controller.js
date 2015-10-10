/**
 * Created by sajankumar on 10/10/15.
 */
/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

var _ = require('lodash');
var Profile = require('./profile.model');
var bcrypt = require('bcrypt-nodejs');
var config = require('../../config/local.env');
var jwt = require('jsonwebtoken');


exports.dummy = function(req,res){
  var token = req.headers['x-access-token'];
  if(token){
    jwt.verify(token, config.SESSION_SECRET, function(err, decoded) {

    });
  }
  res.status(200).send("cool");
};

// Get a profile details of single user from DB.
exports.show = function(req, res) {
  Profile.findById(req.params.id, function (err, users) {
    if(err) { return handleError(res, err); }
    if(!users) { return res.status(404).send('Not Found'); }
    return res.status(200).json(users);
  });
};

// Creates profiles for new user in the DB.
exports.create = function(req, res) {
    var token = req.headers['x-access-token'];
if(token){
  jwt.verify(token, config.SESSION_SECRET, function(err, decoded) {
      // Store hash in your password DB.
      if(err){return handleError(res,err)}
      req.body.id = decoded._id;
    console.log(req.body);
      Profile.create(req.body, function(err, profiles) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(profiles);
      });
    });
}else{
  return res.status(401).json({authentication:'Failure'});

}
};

// Updates an existing profiles to the current user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Profile.findById(req.params.id, function (err, profiles) {
    if (err) { return handleError(res, err); }
    if(!profiles) { return res.status(404).send('Not Found'); }
    var updated = _.merge(profiles, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(profiles);
    });
  });
};

// Deletes profile of the current user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, profiles) {
    if(err) { return handleError(res, err); }
    if(!profiles) { return res.status(404).send('Not Found'); }
    profiles.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
