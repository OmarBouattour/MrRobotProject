const express = require('express');

const TestContoller = require('../controllers/tb_suite');

const router = express.Router();

router.get('/', TestContoller.getAllSuites);


module.exports = router;
