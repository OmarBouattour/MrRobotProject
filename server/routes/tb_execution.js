const express = require('express');

const ExecutionContoller = require('../controllers/tb_execution');

const router = express.Router();

router.get('/', ExecutionContoller.getAllExecutions);


module.exports = router;
