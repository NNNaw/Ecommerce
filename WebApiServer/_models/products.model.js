const mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
  alias: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true,
    default: ""
  },
  price: {
    type: Number,
    require: true,
    default: 10000
  },
  descripts: {
    type: String,
    require: false
  },
  image: String,
  material: {
    type: String,
    require: true,
    default: "Nhôm"
  },
  origin: {
    type: String,
    require: true,
    default: "USA"
  },
  quantity: {
    type: Number,
    require: true,
    default: 1
  },

  ram: {
    type: Number,
    require: false,
    default: 4
  },
  rom: {
    type: Number,
    require: false,
    default: 1025
  },
  operator: {
    type: String,
    require: false,

  },
  Id_Category: {
    type: String,
    require: true,

  },
  Id_Brand: {
    type: String,
    require: true,

  },
  Id_Employee: {
    type: String,
    require: true,

  },
  // ratingProduct: String,
});

var Product = mongoose.model('Product', productSchema, 'Products');
// var Product = mongoose.model('Product', productSchema);

module.exports = Product;