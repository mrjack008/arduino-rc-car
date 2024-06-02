var express = require('express');
const { addReminder } = require('../controller/productivityController');
var router = express.Router();

/* GET home page. */
router.post('/',addReminder);

module.exports = router;
