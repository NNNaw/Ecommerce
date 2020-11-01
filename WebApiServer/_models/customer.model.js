const mongoose = require('mongoose');


var customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: false,
        default: "",
    },
    address: {
        type: String,
        required: false,
        default: "",
    },
    phoneNumber: {
        type: Number,
        require: true,
        min: 10,
        default: 1711061117,
    },
    identitycard: {
        type: Number,
        require: true,
        min: 8,
        default: 1711061117,
    },
    gender: {
        type: String,
        default: "Nam",
        min: 6,
        max: 10
    },
    birthDay: {
        type: Date,
        default: Date.now
    },
    account: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    image: {
        type: String,
        required: false
    },
    displayName: {
        type: String,
        required: false,
        default: "No Name"
    }
});

var Customer = mongoose.model('Customer', customerSchema, 'Customers');

module.exports = Customer;