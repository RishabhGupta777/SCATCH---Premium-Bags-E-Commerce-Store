const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

// Register Controller
module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email });
        //if (user) return res.status(401).send('You already have an account , please login');
        if (user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/"); // Redirect back to the login/home page
        }
        
        // Hash password
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                // Create new user
                let user = await userModel.create({
                    email,
                    password: hash,
                    fullname
                });
                //yha jwt.sign me wo save karo jo hame token ko decode karne samay information chahiye hogi
                let token = generateToken(user);
                res.cookie('token', token);
                res.send('user created successfully');
                //res.redirect("/profile");
            });
        });
    } catch (err) {
        res.send(err.message);
    }
}

// Login Controller
module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        //if (!user) return res.send("Email or Password incorrect");
        if (!user) {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {//result===true hue to 
                let token = generateToken(user);
                res.cookie('token', token);
                //res.send("you are login");
                res.redirect("/shop");
            }
            else {
                req.flash("error", "Email or Password incorrect");
                res.redirect("/");
            }
        })
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.logout = async function (req, res) {
    try {
        res.cookie('token', '');
        //res.send("You are logout now");
        req.flash("success", "You have logout successfully.");
        res.redirect('/');
    } catch (err) {
        res.send(err.message);
    }
}
