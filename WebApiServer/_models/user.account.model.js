
// const mongoose = require('mongoose');


// var useraccountSchema = new mongoose.Schema({

//     fullName: {
//         type: String,
//         required: false,
//         default: "",
//     },
//     address: {
//         type: String,
//         required: false,
//         default: "",
//     },
//     phoneNumber: {
//         type: Number,
//         required: false,
//         min: 10,
//         default: "",
//     },
//     identitycard: {
//         type: Number,
//         required: false,
//         min: 8,
//         default: "",
//     },
//     account: {
//         type: String,
//         required: true,
//         min: 6,
//         max: 255
//     },
//     token: {
//         type: String,
//         required: false,

//     }
// });

// // var UserAccount = mongoose.model('UserAccount', useraccountSchema, 'Users');

// module.exports = UserAccount;

function UserAccount(account, fullName, address, phoneNumber, identitycard, token) {
    this.account = account;
    this.fullName = fullName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.identitycard = identitycard;
    this.token = token;   
}