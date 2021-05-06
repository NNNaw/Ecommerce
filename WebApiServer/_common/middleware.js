const Account = require('./../_models/accounts.model')
const { getInfoAccountTypeByName } = require('./../_controllers/accountTypes.controller');
const { registerValidation } = require('../validation');


const validateDataRegister = function () {

    console.log('validateDataRegister')
    return async (req, res, next) => {

        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        console.log('validateDataRegister1')
        // check account already exist\
      
        const accountExist = await Account.findOne({ account: req.body.account });
        if (accountExist) return res.status(400).send("Tài khoản đã tồn tại, vui lòng đăng ký tài khoản khác ...");

        // invok register user
        const accountType = await getInfoAccountTypeByName(req.body.name_AccountType)

        if (!accountType) {
            res.status(404).send("Role người dùng không tồn tại...");
        }

        req.accountType = accountType;
        next();

    }
}
// const checkManagementIsExist = function () {

//     return async (req, res, next) => {

//         const { error } = registerValidation(req.body);
//         if (error) return res.status(400).send(error.details[0].message);

//         // check account already exist
//         const accountExist = await Account.findOne({ account: req.body.account });
//         if (accountExist) return res.status(400).send("Tài khoản đã tồn tại, vui lòng đăng ký tài khoản khác ...");

//         // invok register user
//         const accountType = await getInfoAccountTypeByName(req.body.name_AccountType)

//         if (!accountType) {
//             res.status(404).send("Role người dùng không tồn tại...");
//         }

//         req.accountType = accountType;
//         next();

//     }
// }

module.exports = {
    validateDataRegister
}