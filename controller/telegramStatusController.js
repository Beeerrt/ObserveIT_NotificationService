var model = require('../model/infounitModel');
var mongoose = require('mongoose');




exports.get = getStatus;
async function getStatus()
{  
    //DB Abfrage der Aktuellen Infounits 
    
    result = await infounitModel.findOne({'nodeid': nodeid}).sort({'date':-1}).limit(1);
    return result;
}