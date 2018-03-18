var mongoose = require('mongoose');

var infounitController = require('../controller/infounitController');
async function intervalFunction()
{
    console.log("Hallo");
    try{
        //laden der infounitGrenzParameter

        //laden der aktuellsten Unit ID's
        idList = [];
        idList = await infounitController.count();
        idList = Array.from(idList);
        //console.log(idList);
    
        //abfragen aller aktuellen Infounits
        idList.forEach(element => {
            
            //für jeden Infounit die Parameter überprüfen

        });

        //const infounits = await infounitController.get();
        //console.log(infounits);
    }catch(e)
    {
        console.log(e);
    }
   
}
intervalFunction();
setInterval(intervalFunction,1500);