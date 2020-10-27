const mongoose = require('mongoose');


var accountSchema = new mongoose.Schema({
    account : {
        type: String,
        required : true,
        min : 6,
        max : 255
    },
    password : {
        type: String,
        required : true,
        min : 6,
        max : 255
    },
    dateCreated : {
        type: Date,
        default : Date.now
    },
    Id_AccountType :{
        type: String,
        default :"5f897dfc7a0f1b7a330a6b3b" // id type Customer
    }
  });

  var account = mongoose.model('Account',accountSchema,'Accounts');

  module.exports = account;