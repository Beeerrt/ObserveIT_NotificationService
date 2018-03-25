var express = require('express');
var router = express.Router();
var infounitController = require("../controller/infounitController");
var limitController = require("../controller/limitController");

router.get('/', infounitController.get);

module.exports = router;
