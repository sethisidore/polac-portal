const express = require('express');
const courseCtrl = require('./course.ctrl');

const router = express.Router();

router.get('/courses', courseCtrl.courseList);

router.get('/courses/:id', courseCtrl.courseInfo);

router.post('/courses/create', courseCtrl.newCourse);

router.delete('/courses/:id', courseCtrl.deleteCourse);

module.exports = router;
