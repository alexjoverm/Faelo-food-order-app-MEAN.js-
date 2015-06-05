'use strict';

var express = require('express');
var controller = require('./date.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// api/dates/

router.get('/default/', controller.index);
router.get('/default/:id', controller.show);
router.post('/default/', auth.hasRole('manager'), controller.create);
router.put('/default/:id', auth.hasRole('manager'), controller.update);
router.patch('/default/:id', auth.hasRole('manager'), controller.update);
router.delete('/default/:id', controller.destroy);


router.get('/week', controller.getWeek);
router.get('/month', controller.getMonth);
router.post('/month', auth.hasRole('manager'), controller.postMonth);
//router.post('/:times', /*auth.hasRole('manager'),*/ controller.postTimes);

router.delete('/month/:date', auth.hasRole('manager'), controller.deleteMonth);
router.delete('/one/:date', auth.hasRole('manager'), controller.deleteOne);
//router.delete('/from/:date', /*auth.hasRole('manager'),*/ controller.deleteFrom);


module.exports = router;
