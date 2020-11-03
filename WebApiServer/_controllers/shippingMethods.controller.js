const ShippingMethod = require('./../_models/shippingMethods.model')


//
module.exports.GetAllMethodShipping = async function (req, res) {

    var shippingMethods = await ShippingMethod.find();

    res.json(shippingMethods);



}


