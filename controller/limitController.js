var mongoose = require('mongoose');
var limitModel = mongoose.model('limit');



exports.get = getLimit;

async function getLimit(req, res){
    var result = await limitModel.find({});
    res.jsonp(result);
}