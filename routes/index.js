var express = require('express');
var router = express.Router();
var infounitController = require("../controller/infounitController");

router.get('/', infounitController.get);

module.exports = router;
