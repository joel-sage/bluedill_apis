const express = require('express');
const router = express.Router();
const { getSettings, putSettings } = require('../controllers/settingsController')
const { jwtVerification } = require("../middleware/authUserVerification.js");

router.route('/setting').post( jwtVerification ,putSettings);
router.route('/settings').get( jwtVerification ,getSettings);

module.exports = router