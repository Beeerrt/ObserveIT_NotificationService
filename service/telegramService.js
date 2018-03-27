var config = require('../config/telegram');
var TelegramBot = require('node-telegram-bot-api');
var telegramController = require('../controller/telegramController');
var infounitController = require('../controller/infounitController');

//token
var token = config.token;

//polling options
var opt = {polling: true};

//create Bot
var bot = new TelegramBot(token, opt);

exports.send = send;

async function send(message){
    //load Telegram ID's
    var idlist = await loadTelegramUserID().then(idList =>{
        var currentID = idList[0].telegramid;
        console.log(currentID);
        bot.sendMessage(currentID
        ,message);
    });
 }

 async function loadTelegramUserID(){
        var idList = await telegramController.get();
        return idList;
 }

 //ID des anfragenden Telegram user
bot.onText(/\/id/, (msg)=> {
	//get sender id
	var id = msg.chat.id;
	bot.sendMessage(id, "Deine Telegram ID lautet: " + msg.chat.id);
});

//Hallo TestCommand
bot.onText(/\/hallo/, (msg)=> {
	//get sender id
	var id = msg.chat.id;
	bot.sendMessage(id, "hallo " + msg.chat.first_name);
});

//Aktuelle Werte Ausgeben
bot.onText(/\/get/, (msg)=> {
	//get sender id
    var id = msg.chat.id;
    //Prüfen ob Telegram ID regestriert ist
    telegramController.getUserByID(id).then(user =>{
        //user ist nicht registriert
        if(user == null)
        {
            bot.sendMessage(id, "Sie sind nicht Authorisiert diesen Command auszuführen!");
        }
        else{
            //Alle Node Infos senden
            infounitController.
            bot.sendMessage(id, "sind sind Authorisiert");
        }
    })
    
});


