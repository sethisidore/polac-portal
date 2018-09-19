const express = require('express');
const RegisterController = require('./course-register.ctrl');

const router = express.Router();

router.post('/', RegisterController.register);

module.exports = router;
