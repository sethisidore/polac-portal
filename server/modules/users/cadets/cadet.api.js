const express = require('express');
const CadetController = require('./cadet.ctrl');
const { asyncHandler } = require('../../utils');

const router = express.Router();

router.get('/', asyncHandler(CadetController.listAllCadet));

router.get('/:id', asyncHandler(CadetController.getCadetById));

router.put('/:id', asyncHandler(CadetController.updateCadet));

module.exports = router;
