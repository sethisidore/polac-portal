const express = require('express');
const studentCtrl = require('./student.ctrl');

const router = express.Router();

router.get('/courses', studentCtrl.studentList);

router.get('/courses/:id', studentCtrl.studentInfo);

router.post('/courses/create', studentCtrl.newStudent);

router.delete('/courses/:id', studentCtrl.deleteStudent);

module.exports = router;
