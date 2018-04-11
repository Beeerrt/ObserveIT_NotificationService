var config = require('../config/telegram');
var TelegramBot = require('node-telegram-bot-api');
var telegramController = require('../controller/telegramController');
var infounitController = require('../controller/infounitController');

//token
var token = config.token;

//polling options
var opt = { polling: true };

//Bot erstellen
var bot = new TelegramBot(token, opt);

/**
 * Schickt Nachricht an alle in der Datenbank enthaltenen Telegram Nutzer
 * @param {*} message 
 */
exports.send = async function send(message) {
    //load Telegram ID's
    var idlist = await loadTelegramUserID().then(idList => {
        for (let current of idList) {
            console.log("send Message to: " + current.telegramid);
            bot.sendMessage(current.telegramid, message);
        }
    });
}

/*
 *Lädt Liste aller Telegram Nutzer in der Datenbank
 */
async function loadTelegramUserID() {
    var idList = await telegramController.get();
    return idList;
}

//ID des anfragenden Telegram user
/**
 * Reagiert auf das Kommando ID
 * Liefert die Telegram ID des aufrufenden Telegram Nutzers zurück
 */
bot.onText(/\/id/, (msg) => {
    //get sender id
    var id = msg.chat.id;
    bot.sendMessage(id, "Deine Telegram ID lautet: " + msg.chat.id);
});


/**
 * Reagiert auf das Kommando GET
 * Liefert alle Sensordaten dem autorisierten Telegram Nutzer zurück
 */
bot.onText(/\/get/, (msg) => {
    sendGet(msg)
});

/**
 * Schickt an den autorisierten Telegram Nutzer eine Liste alle Sensorwerte zurück
 * @param {any} msg 
 */
async function sendGet(msg) {
    //Telegram ID des angefragten Telegram Users extrahieren
    var id = msg.chat.id;

    //Laden des TelegramUser anhand der TelegramID des eingegangenen Chats
    user = await telegramController.getUserByID(id);

    //Prüfen ob Telegram ID regestriert ist
    //User ist nicht autorisiert
    if (user == null) {
        var message = "Sie sind nicht Authorisiert diesen Command auszuführen!\n";
        message += "Bitte kontakieren Sie den Admin!";
        //Message an angefragten Telegram User senden
        bot.sendMessage(id, message);
    }
    //User ist autorisiert
    else {
        //Laden der ID's aller Nodes in der Datenbank
        var idList = [];
        idList = await infounitController.count();
        idList = Array.from(idList);

        bot.sendMessage(id, "Sie sind Authorisiert");
        //Schleife durch alle Nodes
        for (let nodeid of idList) {
            var currentinfounit = await infounitController.get(nodeid);

            //Message generieren
            var message = "NodeID: " + nodeid + ";\n";
            message += "Temperatur: " + currentinfounit.temperatur + "\n";
            message += "Helligkeit: " + currentinfounit.brightness + "\n";
            message += "Luftfeuchtigkeit: " + currentinfounit.humidity + "\n";
            message += "Neigungs Abweichung: " + currentinfounit.incline + "\n";
            message += "Batterieladung: " + currentinfounit.level + "\n";
            
            //Message an angefragten Telegram User senden
            bot.sendMessage(id, message);
        }
    }
}





