const AccountType = require('./../_models/accountTypes.model')

const getInfoAccountTypeByName = async function (nameTypeAccount) {
    try {
        // Find user by id
        let accountType = await AccountType.findOne({ name_AccountType: nameTypeAccount });
        return accountType;
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    getInfoAccountTypeByName
}