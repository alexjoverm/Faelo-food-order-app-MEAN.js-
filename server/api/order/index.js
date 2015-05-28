'use strict';

var express = require('express');
var controller = require('./order.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/all/:userId', auth.hasRole('manager'), controller.showPerUser);
router.get('/date/:date', auth.hasRole('manager'), controller.showPerUser);
router.get('/me/all', auth.isAuthenticated(), controller.showMine);
router.post('/', controller.create);
router.put('/:id', auth.hasRole('manager'), controller.update);
router.patch('/:id', auth.hasRole('manager'), controller.update);
router.delete('/:id', auth.hasRole('manager'), controller.destroy);

module.exports = router;
