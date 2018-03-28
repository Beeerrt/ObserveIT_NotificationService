var config = require('../config/telegram');
var TelegramBot = require('node-telegram-bot-api');
var telegramController = require('../controller/telegramController');
var infounitController = require('../controller/infounitController');

//token
var token = config.token;

//polling options
var opt = { polling: true };

//create Bot
var bot = new TelegramBot(token, opt);

exports.send = send;

async function send(message) {
    //load Telegram ID's
    var idlist = await loadTelegramUserID().then(idList => {
        var currentID = idList[0].telegramid;
        console.log(currentID);
        bot.sendMessage(currentID
            , message);
    });
}

async function loadTelegramUserID() {
    var idList = await telegramController.get();
    return idList;
}

//ID des anfragenden Telegram user
bot.onText(/\/id/, (msg) => {
    //get sender id
    var id = msg.chat.id;
    bot.sendMessage(id, "Deine Telegram ID lautet: " + msg.chat.id);
});

//Hallo TestCommand
bot.onText(/\/hallo/, (msg) => {
    //get sender id
    var id = msg.chat.id;
    bot.sendMessage(id, "hallo " + msg.chat.first_name);
});

bot.onText(/\/get/, (msg) => {
    sendGet(msg)
});

async function sendGet(msg) {
    //get sender id
    var id = msg.chat.id;
    var idList = [];
    idList = await infounitController.count();
    idList = Array.from(idList);

    console.log("Abfrage User");
    user = await telegramController.getUserByID(id);
    console.log("User Abgefragt");
    //Prüfen ob Telegram ID regestriert ist
    // telegramController.getUserByID(id).then(user => {
    //user ist nicht registriert
    if (user == null) {
        var message = "Sie sind nicht Authorisiert diesen Command auszuführen!\n";
        message += "Bitte kontakieren Sie den Admin!";
        bot.sendMessage(id, message);

        console.log("Break");
    }
    else {


        //Alle Node Infos senden
        // infounitController.
        bot.sendMessage(id, "Sie sind Authorisiert");

        //console.log(this.idList);
        for (let nodeid of idList) {
            console.log("Abfrage Infounit");
            var currentinfounit = await infounitController.get(nodeid);
            console.log(currentinfounit);
            //Message generieren
            var message = "NodeID: " + nodeid + ";\n";
            message += "Temperatur: " + currentinfounit.temperatur + "\n";
            message += "Helligkeit: " + currentinfounit.brightness + "\n";
            message += "Luftfeuchtigkeit: " + currentinfounit.humidity + "\n";
            message += "Neigungs Abweichung: " + currentinfounit.incline + "\n";

            bot.sendMessage(id, message);

        }
        console.log("Fertig mit senden");
    }



}


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}


