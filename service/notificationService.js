var mongoose = require('mongoose');
var config = require('../config/telegram');
var infounitController = require('../controller/infounitController');
var limitController = require('../controller/limitController');
var telegramStatusController = require('../controller/telegramStatusController');
var telegramStatusModel = mongoose.model('TelegramStatus');
var telegramController = require('../controller/telegramController');

var telegramService = require('./telegramService');
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

                //telegram Message generieren 
                var message = "Folgende Sensor Werte für Node " + nodeid + " wurden überschritten: ";
                var compareMessage = "Folgende Sensor Werte für Node " + nodeid + " wurden überschritten: ";

                //prüfen der Limits
                if (currentinfounit.brightness >= this.limits.maxBrightness) {
                    // console.log("Helligkeit zu hoch: " + currentinfounit.brightness);
                    message += "Helligkeit zu hoch: " + currentinfounit.brightness + ", ";
                }
                if (currentinfounit.brightness <= this.limits.minBrightness) {
                    // console.log("Helligkeit zu niedrig: " + currentinfounit.brightness);
                    message += "Helligkeit zu niedrig: " + currentinfounit.brightness + ", ";
                }
                if (currentinfounit.temperatur >= this.limits.maxTemperatur) {
                    // console.log("Temperatur zu hoch: " + currentinfounit.temperatur);   
                    message += "Temperatur zu hoch: " + currentinfounit.temperatur + ", ";
                }
                if (currentinfounit.temperatur <= this.limits.minTemperatur) {
                    console.log("Temperatur zu niedrig: " + currentinfounit.temperatur);
                    message += "Temperatur zu niedrig: " + currentinfounit.temperatur + ", ";
                }
                if (currentinfounit.humidity >= this.limits.maxHumidity) {
                    // console.log("Luftfeuchtigkeit zu hoch: " + currentinfounit.humidity);
                    message += "Luftfeuchtigkeit zu hoch: " + currentinfounit.humidity + ", ";
                }
                if (currentinfounit.humidity <= this.limits.minHumidity) {
                    // console.log("Luftfeuchtigkeit zu niedrig: " + currentinfounit.humidity);
                    message += "Luftfeuchtigkeit zu niedrig: " + currentinfounit.humidity + ", ";
                }
                if (currentinfounit.incline >= this.limits.avgIncline) {
                    // console.log("Winkel hat sich zu stark geändert: " + currentinfounit.incline);
                }

                if (message != compareMessage) {
                    //console.log(message);
                    //senden der Nachricht
                    //telegramService.test();
                   await telegramService.send(message);
                }
            });
        }
        await start();

        infounitController.getAllInfounits();



    }

}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
intervalFunction();
setInterval(intervalFunction, config.interval);