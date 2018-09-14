const express = require('express');
const courseController = require('./course.ctrl');
const utils = require('../utils');

const router = express.Router();

router.get('/courses', utils.wrapper(courseController.courseList));

router.get('/courses/:id', utils.wrapper(courseController.courseInfo));

router.post('/courses', utils.wrapper(courseController.newCourse));

router.put('/course/:id', utils.wrapper(courseController.updateCourseInfo));

router.delete('/courses/:id', utils.wrapper(courseController.deleteCourse));

module.exports = router;
