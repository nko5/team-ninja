'use strict';

var express = require('express');
var controller = require('./game.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/callNumber', controller.callNumber);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/addPlayer', auth.isAuthenticated(), controller.addPlayer);
router.post('/:id/claim', auth.isAuthenticated(), controller.claim);

module.exports = router;