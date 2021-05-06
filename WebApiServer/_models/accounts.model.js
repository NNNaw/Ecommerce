const mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({

    account: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },

    AccountType: {
        _id: {
            type: String,
            required: true,
        },
        name_AccountType: {
            type: String,
            required: true,
        }
    },
    
});

var account = mongoose.model('Account', accountSchema, 'Accounts');

module.exports = account;