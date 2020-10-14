// const { string } = require('@hapi/joi');

const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    
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
    account:   {
        type: String,
        required : true,
        min : 6,
        max : 255
    }
  });

  var User = mongoose.model('User',userSchema,'Users');

  module.exports = User;