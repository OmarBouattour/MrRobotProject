const express = require('express');

const TestContoller = require('../controllers/tb_suitesort');

const router = express.Router();

router.get('/', TestContoller.getAllSuitessort);


module.exports = router;
