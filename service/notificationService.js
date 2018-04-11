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

/**
 * Intervall Funktion welche zyklisch aufgerufen wird
 * Überprüft ob Aktivierungsstatus aktiv ist und startet bei aktivem Status die Check Methode
 */
async function intervalFunction() {
    //prüfen ob Service aktiviert ist
    var isActive = await telegramStatusController.getStatus();
    if (isActive) {
        await runCheck();
    }
}

/**
 * Überprüft ob Sensorwerte der Nodes Limits über oder unterschritten haben
 * Schickt bei bedarf Nachricht an alle autorisierten Telegram Nutzer 
 */
async function runCheck(){
    
        //laden der Limits
        this.limits = await limitController.get();

        //laden der aktuellsten Unit ID's
        this.idList = await infounitController.count();
        this.idList = Array.from(this.idList);

        for (let nodeid of idList){
            var currentinfounit = await infounitController.get(nodeid);
        
            //telegram Message generieren 
                var message = "Folgende Sensor Werte für Node " + nodeid 
                + " auf der Position: "+ currentinfounit.position +" wurden überschritten: \n";
                var compareMessage = "Folgende Sensor Werte für Node " 
                + nodeid + " auf der Position: "+ currentinfounit.position +" wurden überschritten: \n";
                //prüfen der Limits
                if (currentinfounit.brightness >= this.limits.maxBrightness) {
                    message += "Helligkeit zu hoch: " + currentinfounit.brightness + ", ";
                }
                if (currentinfounit.brightness <= this.limits.minBrightness) {
                    message += "Helligkeit zu niedrig: " + currentinfounit.brightness + ", ";
                }
                if (currentinfounit.temperatur >= this.limits.maxTemperatur) {
                    message += "Temperatur zu hoch: " + currentinfounit.temperatur + ", ";
                }
                if (currentinfounit.temperatur <= this.limits.minTemperatur) {
                    message += "Temperatur zu niedrig: " + currentinfounit.temperatur + ", ";
                }
                if (currentinfounit.humidity >= this.limits.maxHumidity) {
                    message += "Luftfeuchtigkeit zu hoch: " + currentinfounit.humidity + ", ";
                }
                if (currentinfounit.humidity <= this.limits.minHumidity) {
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