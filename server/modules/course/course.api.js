const express = require('express');
const courseController = require('./course.ctrl');
const utils = require('../utils');

const router = express.Router();

router.get('/', utils.wrapper(courseController.courseList));

router.get('/:id', utils.wrapper(courseController.courseInfo));

router.post('/', utils.wrapper(courseController.newCourse));

router.put('/:id', utils.wrapper(courseController.updateCourseInfo));

router.delete('/:id', utils.wrapper(courseController.deleteCourse));

module.exports = router;
