/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

var express = require('express');
var controller = require('./profile.controller');

var router = express.Router();

router.get('/profile/dummy',controller.dummy);
router.get('/userprofile', controller.show);
router.post('/userprofile/create', controller.create);
router.put('/userprofile/update/:id', controller.update);
router.patch('/userprofile/patch/:id', controller.update);
router.delete('/userprofile/delete/:id', controller.destroy);

module.exports = router;
