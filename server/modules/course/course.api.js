const express = require('express');
const CourseController = require('./course.controller');
const { asyncHandler } = require('../utils');

const router = express.Router();

router.get('/', asyncHandler(CourseController.listAllCourses));

router.get('/:id', asyncHandler(CourseController.getCourse));

router.post('/', asyncHandler(CourseController.createCourse));

router.put('/:id', asyncHandler(CourseController.updateCourse));

router.delete('/:id', asyncHandler(CourseController.deleteCourse));

module.exports = router;
