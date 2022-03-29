const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chatController');

router.route('/getAllChats/:id')
    .get(chatController.getAllChats);

router.route('/createRoom')
    .post(chatController.createRoom);

module.exports = router;