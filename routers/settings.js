const express = require('express');
const router = express.Router();
const { getSettings, putSettings } = require('../controllers/settingsController')


router.route('/setting').post(putSettings);
router.route('/settings').get(getSettings);

module.exports = router