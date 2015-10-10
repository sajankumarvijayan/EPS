/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

var _ = require('lodash');
var User = require('./user.model');
var bcrypt = require('bcrypt');

// check if user is available in DB.
exports.index = function(req, res) {
    User.find({email:req.body.email},function (err, users) {
        if(err) { return handleError(res, err); }
        if(!bcrypt.compareSync(req.body.password, users.password)){
            return res.status(400).json({authentication:"Failed !"});
        }
        return res.status(200).json(users);
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

function handleError(res, err) {
    return res.status(500).send(err);
}
