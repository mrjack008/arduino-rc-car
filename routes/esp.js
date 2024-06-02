// routes/espRoutes.js
const express = require('express');
const router = express.Router();
const { sendCommand } = require('../controller/espController');

router.post('/command', sendCommand);

module.exports = router;
