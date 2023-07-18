const express = require('express');
const router = express.Router();
const { converterFile } = require('../controllers/converterController');
const { jwtVerification } = require("../middleware/authUserVerification.js");
router.route('/convert').post( jwtVerification , converterFile);
// Exporting router module
module.exports = router; 