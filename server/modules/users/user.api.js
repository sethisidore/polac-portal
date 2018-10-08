const express = require('express');
const { asyncHandler } = require('../utils');
const UserController = require('./user.controller');

const router = express.Router();

router.get('/cadets', asyncHandler(UserController.getAllCadets));

router.get('/lecturers', asyncHandler(UserController.getAllLecturers));

router.get('/:id/profile', asyncHandler(UserController.determineAndFetchDetails));

router.put('/:id/', asyncHandler(UserController.determineAndUpdateDetails));

module.exports = router;
