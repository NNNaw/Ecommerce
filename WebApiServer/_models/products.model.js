const mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
    alias : String,
    nameProduct : String,
    priceProduct : String,
    descriptProduct : String,
    ratingProduct : String,
  });

  var Product = mongoose.model('Product',productSchema,'Products');

  module.exports = Product;