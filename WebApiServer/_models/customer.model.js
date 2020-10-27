const mongoose = require('mongoose');


var customerSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required : false,
        default : "",
    },
    address :  {
        type: String,
        required : false,
        default : "",
    },
    phoneNumber :  {
        type: Number,
        required : false,
        min : 10,
        default : "",
    },
    identitycard :  {
        type: Number,
        required : false,
        min : 8,
        default : "",
    },
    gender:{
        type: String,
        default : "Nam",
        min : 6,
        max : 10
    },
    birthDay:{
        type:Date,
        default: "01/01/1999"
    },
    account:   {
        type: String,
        required : true,
        min : 6,
        max : 255
    }
   
  });

  var Customer = mongoose.model('Customer',customerSchema,'Customers');

  module.exports = Customer;