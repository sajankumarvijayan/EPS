/**
 * Created by sajankumar on 10/10/15.
 */
'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/login', controller.index);
router.get('/user/:id', controller.show);
router.post('/create', controller.create);
router.put('/user/:id', controller.update);
router.patch('/user/:id', controller.update);
router.delete('/user/:id', controller.destroy);

module.exports = router;
