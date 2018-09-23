const express = require('express');
const deptController = require('./dept.ctrl');
const { asyncHandler } = require('./../utils');

const router = express.Router();

router.get('/dept', asyncHandler(deptController.listAllDepts));

router.get('/dept/:deptId', asyncHandler(deptController.getDept));

router.post('/dept/create', asyncHandler(deptController.postDept));

router.put('/dept/:deptId/update', asyncHandler(deptController.updateDept));

router.delete('/dept/:id', asyncHandler(deptController.removeDept));

module.exports = router;
