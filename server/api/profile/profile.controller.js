/**
 * Created by sajankumar on 10/10/15.
 */
/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

var _ = require('lodash');
var Profile = require('./profile.model');
var User = require('../users/user.model');
var bcrypt = require('bcrypt-nodejs');
var config = require('../../config/local.env');
var jwt = require('jsonwebtoken');

//this dummy function is not needed..
exports.dummy = function(req,res){
  var token = req.headers['x-access-token'];
  console.log(token);
  if(token){
    jwt.verify(token, config.SESSION_SECRET, function(err, decoded) {
      if(err){return res.status(401).json({authentication:'Failure !'})}
      User.findOne({email:decoded.email},function (err, users) {
        if(err) { return handleError(res, err); }
        console.log(users.isLogged);
        if(!users.isLogged){
          res.status(401).json({authentication:'Failure !'});
          return;
        }

      });
    });
  }
};

// Get a profile details of single user from DB.
exports.show = function(req, res) {
  var token = req.headers['x-access-token'];
  if(!token){return res.status(401).json({authentication:'Failure !'});}
  jwt.verify(token, config.SESSION_SECRET, function(err, decoded) {
     if(err){return handleError(res,err);}
    var obj = {};
    obj.name = decoded.name;
    obj.id = decoded._id;
    console.log(decoded.isLogged);
    User.findOne({email:decoded.email},function (err, users) {
      if(err) { return handleError(res, err); }
      if(!users.isLogged){
        res.status(401).json({authentication:'Failure !'});
        return;
      }

    });

    Profile.findById(obj.id, function (err, users) {
      if(err) { return handleError(res, err); }
      if(!users) { return res.status(200).json(obj); } // should return if user has updated their profile.
      return res.status(200).json(users); // if user didn't have profile info. Simply return name & id of the user.
    });

  });

};

// Creates profiles for new user in the DB.
exports.create = function(req, res) {
    var token = req.headers['x-access-token'];
if(!token) {
  return res.status(401).json({authentication: 'Failure'});
}
  jwt.verify(token, config.SESSION_SECRET, function(err, decoded) {
    // Store hash in your password DB.
    if(err){return handleError(res,err)}
    if(!decoded.isLogged){
      res.status(401).json({authentication: 'Failure'});
      return;
    }
    var obj = {};
    obj.profileId = decoded._id;
    obj.profileDetails = req.body;
    console.log(req.body);
    Profile.create(obj, function(err, profiles) {
      if(err) { return handleError(res, err); }
      return res.status(201).json({message:"successfully profile created !"});
    });
  });
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
