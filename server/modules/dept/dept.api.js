const express = require('express');
const DeptController = require('./dept.ctrl');
const { asyncHandler } = require('./../utils');

const router = express.Router();

router.get('/', asyncHandler(DeptController.listAllDepts));

router.get('/:id', asyncHandler(DeptController.getDept));

router.post('/', asyncHandler(DeptController.postDept));

router.put('/:id', asyncHandler(DeptController.updateDept));

router.delete('/:id', asyncHandler(DeptController.removeDept));

module.exports = router;
