const express = require('express');
const router = express.Router();
const app = express();
const {
    create,
    authenthicate,
    authMiddleware
} = require('../controllers/userController');

// router.route('/').post(authenthicate); 
router.route('/login').post(authenthicate); 
router.route('/register').post(create);

module.exports = router;