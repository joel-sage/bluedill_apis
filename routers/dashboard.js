const express = require('express');
const router = express.Router();
const { home } = require('../controllers/dashboardController');
const { jwtVerification } = require("../middleware/authUserVerification.js");

router.route('/').post(jwtVerification, home);

module.exports = router;