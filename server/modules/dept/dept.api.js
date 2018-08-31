const express = require('express');

const router = express.Router();
const deptController = require('./dept.ctrl');
const utils = require('./../utils');

router.get('/dept', utils.wrapper(deptController.deptList));

router.get('/dept/:deptId', utils.wrapper(deptController.deptInfo));

router.post('/dept/create', utils.wrapper(deptController.newDept));

router.put('/dept/:deptId/update', utils.wrapper(deptController.updateDeptInfo));

router.delete('/dept/:id', utils.wrapper(deptController.deleteDept));

module.exports = router;
