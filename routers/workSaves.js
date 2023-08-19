const express = require('express');
const router = express.Router();
const { saveWithCrypt, retriveCrypt} = require('../controllers/workSavesController');

router.route('/saveFile').post(saveWithCrypt);
router.route('/retriveFile').get(retriveCrypt);



module.exports = router;