var mongoose = require('mongoose');
var schmea = mongoose.Schema;

//DatenbankSchema definieren

//Userschema anlegen
var telegramStatusSchema = new schmea({
    status: {
        type: Boolean
    }
});
    
telegramStatusSchema.statics = {
    load: function(cb){
        this.find({}).exec(cb);
        //this.find().exec(cb);
    }
};

//Model für andere Komponenten verfügbar machen
var telegramStatus = module.exports = mongoose.model('TelegramStatus',telegramStatusSchema);