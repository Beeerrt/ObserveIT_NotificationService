var mongoose = require('mongoose');

var infounitController = require('../controller/infounitController');
var limitController = require('../controller/limitController');

//InfounitArray deklarieren
infounitArray;

async function intervalFunction()
{
    //prüfen ob Service aktiviert ist
    var isActive = this.limitController.get();

    console.log(isActive);
    try{
        
        
        
        //laden der infounitGrenzParameter

        //laden der aktuellsten Unit ID's
        idList = [];
        idList = await infounitController.count();
        idList = Array.from(idList);
        console.log(idList);
        
        //abfragen aller aktuellen Infounits
        idList.forEach(element => {
            // this.infounitArray = await infounitController.get()
            // console.log(this.infounitArray);
            //für jeden Infounit die Parameter überprüfen

        });

        //const infounits = await infounitController.get();
        //console.log(infounits);

        //lImits 
    }catch(e)
    {
        console.log(e);
    }
   
}
intervalFunction();
setInterval(intervalFunction,1500);