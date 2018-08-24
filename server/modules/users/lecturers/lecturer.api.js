const express = require('express');
const lecturerCtrl = require('./lecturer.ctrl');

const router = express.Router();

router.get('/courses', lecturerCtrl.lecturerList);

router.get('/courses/:id', lecturerCtrl.lecturerInfo);

router.post('/courses/create', lecturerCtrl.newLecturer);

router.delete('/courses/:id', lecturerCtrl.deleteLecturer);

module.exports = router;
