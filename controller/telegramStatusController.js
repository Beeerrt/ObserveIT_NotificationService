var telegramStatusModel = require('../model/telegramStatusModel');
var mongoose = require('mongoose');



/**
 * Gibt den aktuellen Aktivierungsstatus des Benachrichtigung Service zurück
 */
exports.getStatus = async function getStatus()
{  
    //DB Abfrage des aktuellen TelegramStatus 
    result = await telegramStatusModel.find({}).limit(1);
    return result[0].status;
}