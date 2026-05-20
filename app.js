//in dono ko first me rakho before DB connection taki debggr setup ho paye
require("dotenv").config(); //.config me .env file ke variable ko use kar payenge
//process.env.DEBUG = "development:mongoose";--> isko hata diye due to setup ho gya debugger ka

const dns=require("dns");
dns.setServers([
     '1.1.1.1',
     '8.8.8.8'
])

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("./config/mongoose-connection");
const session = require("express-session");
const flash = require("connect-flash");
const indexRouter = require("./routes/index");


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //read data of x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.use(
   session({ //yha expressSession nahi sirf session hoga
    resave:false,
    saveUninitialized : false,
    secret : process.env.EXPRESS_SESSION_SECRET,
   })
)
app.use(flash());

// expose auth state to all views
app.use((req, res, next) => {
  res.locals.loggedin = false;
  if (req.cookies && req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
      if (decoded && decoded.email) {
        res.locals.loggedin = true;
      }
    } catch (err) {
      res.locals.loggedin = false;
    }
  }
  next();
});

// view engine
app.set("view engine", "ejs");

//use index routes FIRST
app.use("/", indexRouter);

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

app.use("/owners", ownersRouter);//owners se related sare request bhej do owner routes pe
app.use("/users", usersRouter);
app.use("/products", productsRouter);


// Server listening on port 3000
app.listen(3000,  () => {
  console.log('Server running');
});
