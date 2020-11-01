const Customer = require('../_models/customer.model')

// get all
module.exports.GetAllCustomer = async function (req, res) {

    var customers = await Customer.find();
    res.json(customers);
};


// get by account
module.exports.GetAllCustomer = async function (req, res) {
    let {id} = req.params.id;
    var customers = await Customer.findOne({account : id});
    res.json(customers);
};
