const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controllers/refreshTokenController');

router.get('/', refreshTokenController.handleRefreshTOken);

module.exports = router;