const express = require('express');
const courseController = require('./course.ctrl');
const { asyncHandler } = require('../utils');

const router = express.Router();

router.get('/', asyncHandler(courseController.listAllCourses));

router.get('/:id', asyncHandler(courseController.getCourse));

router.post('/', asyncHandler(courseController.createCourse));

router.put('/:id', asyncHandler(courseController.updateCourse));

router.delete('/:id', asyncHandler(courseController.deleteCourse));

module.exports = router;
