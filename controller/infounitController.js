var model = require('../model/infounitModel');
var mongoose = require('mongoose');
var infounitModel = mongoose.model('infounit');


/**
 * Lädt aktuellste Infounit der übergebenen Node ID
 * @param {*} nodeid 
 */
exports.get = async function getLatestInfounits(nodeid) {
    //DB Abfrage der Aktuellen Infounits 
    result = await infounitModel.findOne({ 'nodeid': nodeid }).sort({ 'date': -1 }).limit(1);
    return result;
}

/**
 * Lädt alle Node IDs in der Datenbank
 */
exports.count = async function getInfounitID() {
    result = await infounitModel.distinct("nodeid");

    return result;
}
