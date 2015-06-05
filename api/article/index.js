'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/default/', controller.index);
router.get('/default/:id', controller.show);
router.post('/default/', auth.hasRole('manager'), controller.create);
router.put('/default/:id', auth.hasRole('manager'), controller.update);
router.patch('/default/:id', auth.hasRole('manager'), controller.update);
router.delete('/default/:id', auth.hasRole('manager'), controller.destroy);

router.get('/snacks/', controller.getSnacks);
router.get('/dishes/', controller.getDishes);

module.exports = router;
