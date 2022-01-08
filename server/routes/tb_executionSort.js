const express = require('express');

const ExecutionContoller = require('../controllers/tb_executionSort');

const router = express.Router();

router.get('/', ExecutionContoller.getAllTestCases);


module.exports = router;
