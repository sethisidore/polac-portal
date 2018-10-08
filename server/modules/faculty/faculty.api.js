const express = require('express');
const { asyncHandler } = require('../utils');
const FacultyController = require('./faculty.controller');

const router = express.Router();

router.get('/', asyncHandler(FacultyController.listAllFaculties));

router.get('/:fac_id', asyncHandler(FacultyController.getFaculty));

router.post('/', asyncHandler(FacultyController.createFaculty));

router.put('/:fac_id', asyncHandler(FacultyController.updateFaculty));

router.delete('/:fac_id', asyncHandler(FacultyController.deleteFaculty));

// For sub-modules
router.get('/:fac_id/depts', asyncHandler(FacultyController.listDeptsByFaculty));

router.get('/:fac_id/depts/:dept_id', asyncHandler(FacultyController.getDeptByFaculty));

module.exports = router;