var model = require('../model/limitModel');
var mongoose = require('mongoose');
var limitModel = mongoose.model('limit');


/**
 * Lädt die aktuellen Limits
 */
exports.get = async function getLimit(){
    var result = await limitModel.find({}).limit(1);
    return result[0];
}