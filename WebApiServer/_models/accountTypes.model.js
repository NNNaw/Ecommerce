
const mongoose = require('mongoose');


var accountTypeSchema = new mongoose.Schema({

    name_AccountType:  {
        type: String,
        required : false,
        default : "",
    }
  });

  var AccountType = mongoose.model('AccountType',accountTypeSchema,'Account_Types');

  module.exports = AccountType;