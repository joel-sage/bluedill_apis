const express = require('express');
const router = express.Router();
const { saveWithCrypt, retriveCrypt } = require('../controllers/workSavesController');

router.route('/saveWithCrypt').post(saveWithCrypt);
router.route('/retriveCrypt').get(retriveCrypt);

module.exports = router;