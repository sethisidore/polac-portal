const express = require('express');
const lecturerCtrl = require('./lecturer.ctrl');

const router = express.Router();

router.get('/', lecturerCtrl.lecturerList);

router.get('/:id', lecturerCtrl.lecturerInfo);

router.post('/:id', lecturerCtrl.newLecturer);

router.put('/:id', lecturerCtrl.updateLecturerInfo);

router.delete('/:id', lecturerCtrl.deleteLecturer);

module.exports = router;
