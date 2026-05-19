const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      //res.send("You need to login first");
      req.flash("error","You need to login first");
      return res.redirect("/");
    }

    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    const user = await userModel.findOne({email : decoded.email}).select("-password"); //-password means password nahi chahiye

    req.user = user;

    next();

  } catch (err) {
    req.flash("error","Something went wrong");
    res.redirect("/");
  }
};

module.exports = isLoggedIn;