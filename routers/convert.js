const express = require('express');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { converter } = require('../controllers/converterController')
router.route('/convert').post(upload.single('file'), converter);


// Exporting router module
module.exports = router; 