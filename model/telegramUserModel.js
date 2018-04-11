var mongoose = require('mongoose');
var config = require('../config/database');

//DatenbankSchema definieren

//Userschema anlegen
var telegramUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nachname:{
        type: String,
        required: true
    },
    telegramid:
    {
        type: String,
        required: true
    }
});
    
telegramUserSchema.statics = {
    load: function(id, cb){
        this.findOne({telegramid : id}).exec(cb);
    }
    
};

//Model für andere Komponenten verfügbar machen
var User = module.exports = mongoose.model('TelegramUser', telegramUserSchema);