const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
require("dotenv").config();

//console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV==="development"){//jab tak enviroment devlopment chal raha h
    router.post("/create",async function(req, res){// tabhi tak ye /crate route availble h-->called environemet based routing
    
         let owners = await ownerModel.find();

    if (owners.length > 0) {
        return res
            .status(503)
            .send("You don't have permission to create a new owner");
    }

    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password
    });

    res.status(201).send(createdOwner);
});                                 
}

router.get("/admin", function(req, res){
    //res.send("hey it's working");
    let success =req.flash("success");
    res.render("createproducts", { success });
});


module.exports = router;