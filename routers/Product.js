const express = require('express');
const router = express.Router();
const { product } = require('../controllers/productController');
 const { jwtVerification } = require("../middleware/authUserVerification.js");


router.route('/').get(jwtVerification,product);

module.exports = router;