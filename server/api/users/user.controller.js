/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

var _ = require('lodash');
var User = require('./user.model');
var bcrypt = require('bcrypt-nodejs');
var config = require('../../config/local.env');
var jwt = require('jsonwebtoken');

// check if user is available in DB.
exports.index = function(req, res) {
    User.findOne({email:req.body.email},function (err, users) {
        if(err) { return handleError(res, err); }
       if(users.length <= 0){
         return res.status(400).send('No user found');

       }
        if(!bcrypt.compareSync(req.body.password, users.password)){
            return res.status(400).json({authentication:"Failed !"});
        }
      var token = jwt.sign(users,config.SESSION_SECRET,{
        expiresInMinutes:1440 // will expire in 24hours
      });
      var obj = {};
          obj.isLogged = true;
      var updated = _.merge(users, obj);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        var user = {};
        user.token = token;
        return res.status(200).json(user);
      });

    });
};

// Get a single user from DB.
exports.show = function(req, res) {
    User.findById(req.params.id, function (err, users) {
        if(err) { return handleError(res, err); }
        if(!users) { return res.status(404).send('Not Found'); }
        return res.status(200).json(users);
    });
};

// Creates a new user in the DB.
exports.create = function(req, res) {
    if(typeof req.body.password === "undefined"){
        return res.status(400).send(new error("unable to create"))
    }
    bcrypt.hash(req.body.password, null,null, function(err, hash) {
        // Store hash in your password DB.
        if(err){return handleError(res,err)}
        req.body.password = hash;
        User.create(req.body, function(err, users) {
            if(err) { return handleError(res, err); }
            return res.status(201).json(users);
        });
    });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    User.findById(req.params.id, function (err, users) {
        if (err) { return handleError(res, err); }
        if(!users) { return res.status(404).send('Not Found'); }
        var updated = _.merge(users, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).json(users);
        });
    });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
    User.findById(req.params.id, function (err, users) {
        if(err) { return handleError(res, err); }
        if(!users) { return res.status(404).send('Not Found'); }
        users.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.status(204).send('No Content');
        });
    });
};

// logout

exports.logout = function(req,res){
  var token = req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, config.SESSION_SECRET, function (err, decoded) {
      if(err){handleError(res,err); return}
      var obj = {};
      obj.isLogged = false;
      User.findOne({email:decoded.email},function (err, users) {
        if (err) {
          return handleError(res, err);
        }

        var updated = _.merge(users, obj);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          res.status(200).json({success: true});
          return;
        });
      });


    });
  }else{
     res.status(401).json({authentication: "Failure !"});
  }
};
function handleError(res, err) {
    return res.status(500).send(err);
}
