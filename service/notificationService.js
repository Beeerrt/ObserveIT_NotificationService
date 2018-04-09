var mongoose = require('mongoose');
var config = require('../config/telegram');
var infounitController = require('../controller/infounitController');
var limitController = require('../controller/limitController');
var telegramStatusController = require('../controller/telegramStatusController');
var telegramStatusModel = mongoose.model('TelegramStatus');
var telegramController = require('../controller/telegramController');


var telegramService = require('./telegramService');


limits = [];
idList = [];



async function intervalFunction() {
    console.log("Start Intervall");
    console.log("Check Status");
    //prüfen ob Service aktiviert ist
    var isActive = await telegramStatusController.getStatus();

    
    console.log("Check if Status is active");
    if (isActive) {
        console.log("Start runCheck");
        await runCheck();
    }
    console.log("komplett fertig");

}

async function runCheck(){
    
        console.log("Start get limits");
        //laden der Limits
        this.limits = await limitController.get();
        console.log("finish get Limits");
        //console.log(this.limits);
        //laden der aktuellsten Unit ID's

        console.log("Start get ids");
        this.idList = await infounitController.count();
        this.idList = Array.from(this.idList);
        console.log("finish get ids");
        //console.log(this.idList);
        console.log("Start for Each");

        for (let nodeid of idList){
            console.log("Abfrage Infounit");
            var currentinfounit = await infounitController.get(nodeid);
            console.log( currentinfounit);
        
        
            //telegram Message generieren 
                var message = "Folgende Sensor Werte für Node " + nodeid 
                + " auf der Position: "+ currentinfounit.position +" wurden überschritten: \n";
                var compareMessage = "Folgende Sensor Werte für Node " 
                + nodeid + " auf der Position: "+ currentinfounit.position +" wurden überschritten: \n";
                console.log(currentinfounit.batterylevel);
                console.log("check Limits")
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
                    message += "Neigungswinkel hat sich Prozentual zu Stark geändert: " + currentinfounit.batterylevel + " %, ";
                }
                if(currentinfounit.level <= this.limits.batterylevel)
                {
                    message += "Batterieladung zu niedrig: " + currentinfounit.batterylevel + ".";
                }

                if (message != compareMessage) {
                   await telegramService.send(message);
                }
        }

}

intervalFunction();
setInterval(intervalFunction, config.interval);