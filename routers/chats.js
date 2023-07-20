const express = require('express');
const router = express.Router();
const { chat, chats, message,  updateMessageStatus} = require('../controllers/chatController')

router.route('/message').post(message);
router.route('/chats').post(chats);
router.route('/chat').post(chat);
router.route('/updateMessage').post(updateMessageStatus)
module.exports = router;
 