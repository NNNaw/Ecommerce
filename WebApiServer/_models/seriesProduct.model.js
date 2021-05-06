const mongoose = require('mongoose');


var seriesProductSchema = new mongoose.Schema({

    alias: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    category_Series: {
        _id: {
            type: String,
            required: true
        },
        nameCategory: {
            type: String,
            required: true
        }

    },
    brand_Series: {
        _id: {
            type: String,
            required: true
        },
        nameBrand: {
            type: String,
            required: true
        }
    },

    management_Series: {
        _id: {
            type: String,
            required: true
        },
        account: {
            type: String,
            required: true
        }
    },
    
});

var SeriesProduct = mongoose.model('SeriesProduct', seriesProductSchema, 'SeriesProducts');
// var Product = mongoose.model('Product', productSchema);

module.exports = SeriesProduct;