var mongoose = require('mongoose');
var schmea = mongoose.Schema;

var limitSchema = new schmea({
    //neigung
    maxTemperatur: String,
    minTemperatur: String,
    //neigungs 
    avgIncline: String,
    //Luftfeuchtigkeit
    maxHumidity: String,
    minHumidity: String,
     //helligkeit
    maxBrightness: String,
    minBrightness: String,
    //Batterieladung
    level: String
});

limitSchema.statics = {
    load: function(id, cb){
        this.findOne({_id : id}).exec(cb);
    }
};

mongoose.model('limit',limitSchema);
