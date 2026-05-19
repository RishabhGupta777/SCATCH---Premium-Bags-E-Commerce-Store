const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/userModel");

router.get("/", function (req, res) {
    //res.send("its working...");
    let error = req.flash("error");
    res.render("index", { error , loggedin: false }); //slash ya index page pe logged in ki value false taki wo logged out etc ka button na dikhe
});                             // yha isloggedin middle where mat laga dena nahi to login nahi h wo index page pe bhi nahi aa payega

router.get("/shop", isloggedin, async function (req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop",{products , success , loggedin: true  });
});


router.get("/addtocart/:productid", isLoggedIn, async function(req, res){
    let user = await userModel.findOne({
        email: req.user.email
    });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async function(req, res){

    let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

    let totalMRP = 0;
    let totalDiscount = 0;

    user.cart.forEach(function(item){

        totalMRP += Number(item.price);
        totalDiscount += Number(item.discount);

    });

    let finalBill = totalMRP + 20 - totalDiscount;

    res.render("cart", {
        user,
        totalMRP,
        totalDiscount,
        finalBill,
        loggedin: true
    });

});

module.exports = router;