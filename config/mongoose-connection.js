const mongoose = require("mongoose");
require("dotenv").config();

const dbgr = require("debug")("development:mongoose");

if (!process.env.MONGODB_URI) {
    console.error("Warning: MONGODB_URI is not set in your .env file");
}

mongoose.connect(process.env.MONGODB_URI)
.then(function(){ //agar connect ho gaya then
    dbgr("mongoDB connected");//->ye kuch bhi print nahi karega jab tak environement var. setup nahi karoge 
    //console.log("mongoDB connected");
})
.catch(function(err){ //connect nahi hua to catch karo
    dbgr(err);
    console.log(err);
});

module.exports = mongoose.connection;