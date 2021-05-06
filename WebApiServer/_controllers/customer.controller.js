const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary');
const Account = require('./../_models/accounts.model');
const Customer = require('../_models/customer.model')

// get all
module.exports.GetAllCustomer = async function (req, res) {

    var customers = await Customer.find();
    res.json(customers);
};


module.exports.GetCustomer = async function (req, res) { /// get detail user by Id
    let idUser = req.Id_UserLogin; // user name\
    try {
        var customer = await Customer.findById(idUser);
        var account = await Account.findOne({ account: customer.account });
        let infoAccount = { // detail info aaccount
            _id: customer._id,
            account: account.account,
            dateCreated: account.dateCreated,
            AccountType: account.AccountType,

            displayName: customer.displayName,
            fullName: customer.fullName,
            image: customer.image,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            identitycard: customer.identitycard,
            gender: customer.gender,
            birthDay: customer.birthDay
        }

        console.log(infoAccount)
        res.status(200).json(infoAccount);

    } catch (error) {
        res.status(400).json("Người dùng không tồn tại ...");
    }

}