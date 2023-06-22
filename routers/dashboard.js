const express = require('express');
const router = express.Router();
const { home } = require('../controllers/dashboardController');
const { validateToken } = require('../middleware/authenticateUser')

router.route('/').post(validateToken, home);

module.exports = router;