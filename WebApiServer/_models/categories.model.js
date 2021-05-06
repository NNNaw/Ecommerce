const mongoose = require('mongoose');


var categorySchema = new mongoose.Schema({
    nameCategory: {
        type: String,
        required: true,
    },
    aliasCategory: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: false,
        default: ''
    },
    managementCreated: {
        _id: {
            type: String,
            required: true,
        },
        account: {
            type: String,
            required: true,
        }

    },
    cloudinary_id: {
        type: String,
    },
});

var Category = mongoose.model('Category', categorySchema, 'Categories');

module.exports = Category;