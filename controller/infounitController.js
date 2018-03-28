var model = require('../model/infounitModel');
var mongoose = require('mongoose');
var infounitModel = mongoose.model('infounit');


exports.get = getLatestInfounits;
async function getLatestInfounits(nodeid) {
    //DB Abfrage der Aktuellen Infounits 

    result = await infounitModel.findOne({ 'nodeid': nodeid }).sort({ 'date': -1 }).limit(1);
    return result;
}

//gibt die die NodeID's der in der DB enthaltenen Nodes zurück
exports.count = getInfounitID;
async function getInfounitID() {
    result = await infounitModel.distinct("nodeid");

    return result;
}
