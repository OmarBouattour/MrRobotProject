const express = require('express');

const ExecutionContoller = require('../controllers/lastexecution');

const router = express.Router();

router.get('/', ExecutionContoller.getExecution);


module.exports = router;
