const express = require('express');
const StudentController = require('./student.ctrl');
const { asyncHandler } = require('../../utils');

const router = express.Router();

router.get('/', asyncHandler(StudentController.listAllStudent));

router.get('/:id', asyncHandler(StudentController.getStudent));

router.put('/:id', asyncHandler(StudentController.updateStudent));

module.exports = router;
