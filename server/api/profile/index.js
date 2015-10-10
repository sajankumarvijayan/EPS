/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

var express = require('express');
var controller = require('./profile.controller');

var router = express.Router();

//router.post('/profile/dummy',controller.dummy);
router.get('/profile/:id', controller.show);
router.post('/profile/create', controller.create);
router.put('/profile/update/:id', controller.update);
router.patch('/profile/patch/:id', controller.update);
router.delete('/profile/delete/:id', controller.destroy);

module.exports = router;
