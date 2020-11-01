const mongoose = require('mongoose');


var brandCateSchema = new mongoose.Schema({
    Id_Category : {
        type: String,
        required : true,
    },
    Id_Brand : {
        type: String,
        required : true,
    },
   
    
  });

  var BrandCategory = mongoose.model('BrandCategory',brandCateSchema,'BrandCategories');

  module.exports = BrandCategory;