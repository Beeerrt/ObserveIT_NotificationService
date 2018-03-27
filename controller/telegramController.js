var user = require('../model/telegramUserModel');
var mongoose = require('mongoose');
var telegramUserModel = mongoose.model('TelegramUser');


exports.get = getTelegramUser;

async function getTelegramUser(req, res){
    var result = await telegramUserModel.find({});
    return result;
}

exports.getUserByID = getUserByID;

async function getUserByID(id){
    var result = await telegramUserModel.findOne({telegramid : id});
    return result;
}