const mongoose = require('mongoose');


var paymentMethodSchema = new mongoose.Schema({

    namePaymentMethod: {
        type: String,
        default: ""
    },
    TexMethod: { // tax method
        type: Number,
        default: 1
    },

});

var PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema, 'PaymentMethods');

module.exports = PaymentMethod;
