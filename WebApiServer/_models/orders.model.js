const mongoose = require('mongoose');


var orderSchema = new mongoose.Schema({
  
    dateCheckin: {
        type: Date,
        default: Date.now
    },
    dateCheckout: {
        type: Date,
        require: false,
        default: ""
    },
    status:
    {
        type: Boolean,
        default: false
    },// true is comfirmed
    address: {
        type: String,
        default: "Tp hcmmm"
    }, // address of the order at the time

    note: {
        type: String,
        default: "nothing"
    },
    Id_PaymentMethod: {
        type: String,
        required: true
    },
    Id_ShippingMethod: {
        type: String,
        required: true
    },
    Id_Employee: {
        type: String,
        required: false
    },
    account: {
        type: String,
        required: true
    },

    OrderDetail: [{

        Id_Product: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
});


//   {dateCheckin:"2020-10-30",dateCheckout:"2020-10-31",status:true,address:"Tp Hcm",note:"nothing",
//  Id_PaymentMethod:"5f9ed20d4209cb5d9fbccd0d",Id_ShippingMethod:"5f9ed3004209cb5d9fbccd10",Id_Employee:"5f8be1665906063e985f6b44",Id_Customer:"5f9c4895feba3b29302c560f" ,
//     OrderDetail:[
//         {Id_Product:"5f9a563c729de7760e21f0c5", quantity: 2},
//           {Id_Product:"5f9a563c729de7760e21f0c8", quantity: 3},
//           {Id_Product: ObjectId("5f9a563c729de7760e21f0c7"), quantity: 1},

//     ]

var Order = mongoose.model('Order', orderSchema, 'Orders');

module.exports = Order;