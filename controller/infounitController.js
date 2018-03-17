var model = require('../model/infounitModel');
var mongoose = require('mongoose');
var infounitModel = mongoose.model('infounit');


exports.get = getLatestInfounits
async function getLatestInfounits()
{  
    //DB Abfrage der Aktuellen Infounits 
    result = await infounitModel.find();
    return result;
}