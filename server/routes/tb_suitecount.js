const express = require('express');

const TestContoller = require('../controllers/tb_suitecount');

const router = express.Router();

router.get('/', TestContoller.getAllSuitescount);


module.exports = router;
