const express = require('express');
const AuthController = require('./auth.controller');
const { asyncHandler } = require('../utils');

const router = express.Router();

router.post('/login', AuthController.login);

router.post('/register', asyncHandler(AuthController.register));

router.get('/status', AuthController.getStatus);

router.get('/logout', AuthController.logout);

module.exports = router;
