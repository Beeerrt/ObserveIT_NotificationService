var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//MongoDB Verbindung aufbauen
var mongo = require('./controller/mongoController');


var app = express();

var notficationService = require('./service/notificationService');



module.exports = app;
