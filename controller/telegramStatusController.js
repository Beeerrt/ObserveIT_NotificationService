var telegramStatusModel = require('../model/telegramStatusModel');
var mongoose = require('mongoose');




exports.getStatus = getStatus;
async function getStatus()
{  
    //DB Abfrage des aktuellen TelegramStatus 
    result = await telegramStatusModel.find({}).limit(1);
    return result[0].status;
}