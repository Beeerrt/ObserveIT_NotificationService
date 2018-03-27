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

exports.getAllInfounits = getAllInfounits;
async function getAllInfounits() {

    await getInfounitID().then(idList => {
        idList =[];
        idList = Array.from(idList);
        console.log(idList);

        //laden der Aktuellsten Infounits
        infounitList = [];
        console.log(infounitList);


    });


    // infounitList =[];

    // for(var i = 0; i <= idList.count; i++)
    // {
    //     var currentInfounit = await getLatestInfounits(i).then(infounit => {
    //         infounitList.push(infounit);
    //     });
    //}


}

async function test(){
    for(let i = 0; i < idList.count; i++){
        await getLatestInfounits(i);
        console.log(i);
    }
}