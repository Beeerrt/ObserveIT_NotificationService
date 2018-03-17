var config = require('../config/database');
var mongoose = require('mongoose');



//MongoDB Connection
mongoose.connect(config.database);

//Verbindung zur Datenbank erfolgreich
mongoose.connection.on('connected', function(){
  console.log('Connected to database ' + config.database);
})

//Verbindung zur Datenbank fehlgeschlagen
mongoose.connection.on('err', function(err){
  console.log('Failed to Connect to Database: ' + err);
})

