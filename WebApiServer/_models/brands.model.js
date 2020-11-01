const mongoose = require('mongoose');


var brandSchema = new mongoose.Schema({
    nameBrand : {
        type: String,
        required : true,
    },
    aliasBrand : {
        type: String,
        required : true,
    },
    dateCreated : {
        type: Date,
        
        default : Date.now,
    },
    image : {
        type: String,
        required : false,
        default: ''
    },
    Id_Management : {
        type: String,
        required : true,
    },
  });

  var Brand = mongoose.model('Brand',brandSchema,'Brands');

  module.exports = Brand;