const mongoose = require('mongoose');


var shippingMethodSchema = new mongoose.Schema({

    nameShippingMethod: {
        type: String,
        default: ""
    },
    FeeShipping: { // tax method
        type: Number,
        default: 10000
    },

});

var ShippingMethod = mongoose.model('ShippingMethod', shippingMethodSchema, 'ShippingMethod');

module.exports = ShippingMethod;
