var mongoose = require('mongoose');

 var infounitController = require('../controller/infounitController');
var limitController = require('../controller/limitController');
var telegramStatusController = require('../controller/telegramStatusController');
//InfounitArray deklarieren
infounitArray = [];
limits = [];
idList = [];



async function intervalFunction() {
    //prüfen ob Service aktiviert ist
    var isActive = await telegramStatusController.getStatus();
    if (isActive) {


        //laden der Limits
        this.limits = await limitController.get();
        //console.log(this.limits);
        //laden der aktuellsten Unit ID's
        
        this.idList = await infounitController.count();
        this.idList = Array.from(this.idList);
        //console.log(this.idList);

        const start = async () => {
        asyncForEach(this.idList, async (nodeid) => {
            var currentinfounit = await infounitController.get(nodeid);
            //console.log(currentinfounit);
            //prüfen der der Limits
            console.log("Node ID: " + nodeid);
            if(currentinfounit.brightness >= this.limits.maxBrightness)
            {
                console.log("Helligkeit zu hoch: " + currentinfounit.brightness);
            }
            if(currentinfounit.brightness <= this.limits.minBrightness)
            {
                console.log("Helligkeit zu niedrig: " + currentinfounit.brightness);
           }
            if(currentinfounit.temperatur >= this.limits.maxTemperatur)
            {
                console.log("Temperatur zu hoch: " + currentinfounit.temperatur);   
            }
            if(currentinfounit.temperatur <= this.limits.minTemperatur)
            {
                console.log("Temperatur zu niedrig: " + currentinfounit.temperatur);
            }
            if(currentinfounit.humidity >= this.limits.maxHumidity)
            {
                console.log("Luftfeuchtigkeit zu hoch: " + currentinfounit.humidity);
            }
            if(currentinfounit.humidity <= this.limits.minHumidity)
            {
                console.log("Luftfeuchtigkeit zu niedrig: " + currentinfounit.humidity);
            }
            if(currentinfounit.incline >= this.limits.avgIncline)
            {
                console.log("Winkel hat sich zu stark geändert: " + currentinfounit.incline);
            }


          });
        }
        start();
        console.log("fertig");
    }

}

async function asyncForEach(array, callback){
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
      }
}
intervalFunction();
setInterval(intervalFunction, 1500);