const express = require('express');
const router = express.Router();
const { save } = require('../controllers/workSavesController');

router.route('/').post(save);

module.exports = router;