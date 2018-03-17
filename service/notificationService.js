var mongoose = require('mongoose');

var infounitController = require('../controller/infounitController');
async function intervalFunction()
{
    console.log("Hallo");
    try{
        const infounits = await infounitController.get();
        console.log(infounits);
    }catch(e)
    {
        console.log(e);
    }
   
}
intervalFunction();
setInterval(intervalFunction,1500);