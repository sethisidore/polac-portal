const express = require('express');
const LecturerController = require('./lecturer.ctrl');
const { asyncHandler } = require('../../utils');

const router = express.Router();

router.get('/', asyncHandler(LecturerController.listAllLecturers));

router.get('/:id', asyncHandler(LecturerController.getLecturer));

router.put('/:id', asyncHandler(LecturerController.updateLecturer));

module.exports = router;
