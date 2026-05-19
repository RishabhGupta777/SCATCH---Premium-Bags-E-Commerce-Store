const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose");
                            //kis plase me ho , kha se mssg aa raha h(mongoose me se)   

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)//ye appke laptop ke mongoDB se connect karne ki kosis karega
.then(function(){ //agar connect ho gaya then
    dbgr("mongoDB connected");//->ye kuch bhi print nahi karega jab tak environement var. setup nahi karoge 
    //console.log("mongoDB connected");
})
.catch(function(err){ //connect nahi hua to catch karo
    dbgr(err);
    console.log(err);
});

module.exports = mongoose.connection;