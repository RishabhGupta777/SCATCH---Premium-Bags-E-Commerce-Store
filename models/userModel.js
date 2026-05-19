const mongoose = require("mongoose");

//ab yha mongoDB connect nahi karna par raha h wo config me connect ho raha h

const userSchema = mongoose.Schema({
  fullname:{
    type: String,
    minlength:3,
    trim:true,
  },
  email: String,
  password: String,

  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"product"  //refernce de rahe h ki jo id aegi wo product schema ki hogi
  }],

  isAdmin: Boolean,

  orders: {
    type: Array,
    default: [],
  },

  contact: Number,

  picture: String,
});

//collection ka naam isi line par depend karega and mongoDB automatic user ka plural users bana dega
module.exports = mongoose.model("user", userSchema);