const mongoose = require("mongoose");

// No local mongoose.connect() here because the app connection is handled in config/mongoose-connection.js
const productSchema = mongoose.Schema({
  image: Buffer,

  name: String,

  price: Number,

  discount: {
    type: Number,
    default: 0,
  },

  bgcolor: String,

  panelcolor: String,

  textcolor: String,
});

module.exports = mongoose.model("product", productSchema);