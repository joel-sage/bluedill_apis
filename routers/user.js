const express = require('express');
const router = express.Router();
const CookieParser = require('cookie-parser');
const app = express();
const {
    create,
   loginWithAuthentication
} = require('../controllers/userController');
// router.route('/').post(authenthicate); 
router.route('/login').post(loginWithAuthentication); 
router.route('/register').post(create);

module.exports = router;