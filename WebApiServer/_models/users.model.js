// const { string } = require('@hapi/joi');


const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({

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
    cloudinary_id: {
        type: String,
        default: "Image Default"
    },
    displayName: {
        type: String,
        required: false,
        default: "No Name"
    }

});

var User = mongoose.model('User', userSchema, 'Users');

module.exports = User;