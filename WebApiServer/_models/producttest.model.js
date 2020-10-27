const mongoose = require('mongoose');


var productTestSchema = new mongoose.Schema({
    nameProduct : {
        type: String,
    
       default:""
    },
    priceProduct : {
        type: Number,
       
        default:""
    },
    imageProduct : {
        type: String,
    },

  });

  var ProductTest = mongoose.model('ProductTest',productTestSchema,'ProductTest');

  module.exports = ProductTest;