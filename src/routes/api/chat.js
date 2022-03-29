const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chatController');

router.route('/getAllChats')
    .get(chatController.getAllChats)

module.exports = router;