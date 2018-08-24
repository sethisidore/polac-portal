const express = require('express');
const deptCtrl = require('./dept.ctrl');

const router = express.Router();

router.get('/dept', deptCtrl.deptList);

router.get('/dept/:id', deptCtrl.deptInfo);

router.post('/dept/create', deptCtrl.newDept);

router.delete('/dept/:id', deptCtrl.deleteDept);

module.exports = router;
