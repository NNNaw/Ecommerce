const PaymentMethod = require('./../_models/paymentMethods.model')


//
module.exports.GetAllMethodPayment = async function (req, res) {



    var paymentMethods = await PaymentMethod.find();




    res.json(paymentMethods);



}


