const express = require('express');
const studentCtrl = require('./student.ctrl');

const router = express.Router();

router.get('/', studentCtrl.studentList);

router.get('/:id', studentCtrl.studentInfo);

router.post('/:id', studentCtrl.newStudent);

router.put('/:id', studentCtrl.updateStudentInfo);

router.delete('/:id', studentCtrl.deleteStudent);

module.exports = router;
