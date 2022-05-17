const express = require('express');
const router = express.Router();
const rewardVideoController = require('../../controllers/rewardVideoController');

router.route('/')
    .get(rewardVideoController.getRewardData)

module.exports = router;