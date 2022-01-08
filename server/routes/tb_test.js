const express = require('express');

const TestContoller = require('../controllers/tb_test');

const router = express.Router();

router.get('/', TestContoller.getAllTests);


module.exports = router;
