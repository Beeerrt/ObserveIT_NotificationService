var user = require('../model/telegramUserModel');
var mongoose = require('mongoose');
var telegramUserModel = mongoose.model('TelegramUser');


/**
 * Gibt alle Telegram User zurück
 * @param {*} req 
 * @param {*} res 
 */
exports.get = async function getTelegramUser(req, res){
    var result = await telegramUserModel.find({});
    return result;
}

/**
 * Lädt Telegram User anhand der übergebenen Telegram ID
 * @param {*} id 
 */
exports.getUserByID = async function getUserByID(id){
    var result = await telegramUserModel.findOne({telegramid : id});
    return result;
}