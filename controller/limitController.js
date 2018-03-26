var model = require('../model/limitModel');
var mongoose = require('mongoose');
var limitModel = mongoose.model('limit');



exports.get = getLimit;

async function getLimit(){
    var result = await limitModel.find({}).limit(1);
    return result[0];
}