const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary');
const { CreateToken } = require('./../_routes/verifyToken')

const Account = require('../_models/accounts.model')
const Customer = require('../_models/customer.model')
const Employee = require('../_models/employee.model')
const Management = require('../_models/management.model')
const AccountType = require('./../_models/accountTypes.model')

const { getInfoAccountTypeByName } = require('./accountTypes.controller')

const { registerValidation, loginValidation } = require('./../validation')
//import handle tokens
const { urlImage, Roles } = require('./../_common/variable.common');


module.exports.Login = async function (req, res) {


  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);


  // check account already exist
  const accountExist = await Account.findOne({ account: req.body.account });
  if (!accountExist) return res.status(400).send("Tài khoản hoặc mật khẩu không đúng!");
  // compare password
  const validatePassword = await bcrypt.compare(req.body.password, accountExist.password);
  if (!validatePassword) return res.status(400).send("Mật khẩu không đúng!")


  try {
    let userExist;
    let UserAccount;
    switch (accountExist.AccountType.name_AccountType) {

      case Roles.Management: // admin
        {

          userExist = await Management.findOne({ account: accountExist.account });
          const { _id, account, fullName, displayName, image, address, phoneNumber, identitycard, gender, birthday } = userExist;

          UserAccount = { // detail account + user = token
            _id: _id,
            account: account,
            AccountType: accountExist.AccountType,
            address: address,
            displayName: displayName,
            phoneNumber: phoneNumber,
            identityCard: identitycard,
            fullName: fullName,
            gender: gender,
            birthday: birthday,
            image: image,
            token: CreateToken(_id),
          }
          break;
        }
      case Roles.Employee: // nhân viên
        {

          userExist = await Employee.findOne({ account: accountExist.account });
          const { _id, account, fullName, displayName, image, address, phoneNumber, identitycard, gender, birthday, managementCreated } = userExist;

          UserAccount = { // detail account + user = token
            _id: _id,
            account: account,
            AccountType: accountExist.AccountType,
            address: address,
            phoneNumber: phoneNumber,
            displayName: displayName,
            identityCard: identitycard,
            fullName: fullName,
            gender: gender,
            image: image,
            birthday: birthday,
            managementCreated: managementCreated,
            token: CreateToken(_id),
          }
          break;
        }
      case Roles.Customer: // khách hàng
        {
          userExist = await Customer.findOne({ account: accountExist.account });

         
          const { _id, account, image, displayName } = userExist;

          UserAccount = { // detail account + user = token
            _id: _id,
            account: account,
           
            AccountType: accountExist.AccountType,

            image: image,
            displayName: displayName,
            token: CreateToken(_id),

            // phoneNumber: phoneNumber,
            // identityCard: identitycard,
            // fullName: fullName,
            // gender: gender,
            // birthday: birthday,
            // address: address,

          }
          console.log(UserAccount)
          break;
        }
      default:
        res.status(404).send("Không tìm thấy role trong hệ thống ...")
        break;

    }
    //sign to UserAccount
    res.header('auth-token', UserAccount.token).send(UserAccount);
  } catch (error) {
    res.status(404).send(error)
  }
}

const addNewAccount = async function (account, password, AccountType) {

  try {

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newAccount = new Account({
      account: account,
      password: hashPassword,
      AccountType: AccountType
    });
    Account.create(newAccount)
  } catch (error) {
    res.status(404).json({ message: error })
  }
}


module.exports.RegisterCustomer = async function (req, res) {

  addNewAccount(req.body.account, req.body.password, req.accountType);

  try {
    const newCustomer = new Customer({
      account: req.body.account,
      fullName: "No Name",
      displayName: req.body.displayName,
      image: req.body.gender !== "Nam" ? urlImage.avartaFemale : urlImage.avartaMale,
      address: "No address",
      phoneNumber: 1711061117,
      identitycard: 1711061117,
      gender: req.body.gender,
      birthDay: Date.now()
    });


    Customer.create(newCustomer).then(function (customer) {
      res.status(200).json(customer);
    });


    // stack overflow
    //    res.status(400).json({
    //     status: 'error',
    //     error: 'req body cannot be empty',
    //   });
    // }

    // res.status(200).json({
    //   status: 'succes',
    //   data: req.body,
    // })


  } catch (err) {
    res.json({ message: err })
  }

}

module.exports.RegisterEmployee = async function (req, res) {

  addNewAccount(req.body.account, req.body.password, req.accountType);

  try {
    const newEmployee = new Employee({
      account: req.body.account,
      fullName: "No Name",
      displayName: req.body.displayName,
      image: req.body.gender !== "Nam" ? urlImage.avartaFemale : urlImage.avartaMale,
      address: "No address",
      phoneNumber: 1711061117,
      identitycard: 1711061117,
      gender: req.body.gender,
      birthDay: Date.now(),
      managementCreated: req.managementCreated
    });


    Employee.create(newEmployee).then(function (employee) {
      res.status(200).json(employee);
    });

  } catch (err) {
    res.json({ message: err })
  }

}



module.exports.UpdateCustomer = async function (req, res) {

  try {

    const updateCustomer = await Customer.updateOne(
      { account: req.params.id },
      {
        $set:
        {
          displayName: req.body.displayName,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          identitycard: req.body.identitycard,
          gender: req.body.gender,
          birthDay: req.body.birthDay,
          address: req.body.address,
        }
      });
    res.json(updateCustomer);
  } catch (error) {
    res.json({ message: err })
  }
}

module.exports.ChangePassword = async function (req, res) {
  try {

    console.log(req.body)
    const accountExist = await Account.findOne({ account: req.params.id });
    if (!accountExist) return res.status(400).send("Tài khoản hoặc mật khẩu không đúng!");



    // compare password
    const validatePassword = await bcrypt.compare(req.body.password, accountExist.password);

    if (!validatePassword) return res.status(400).send("Mật khẩu không đúng!")


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

    const account = await Account.updateOne(
      { account: req.params.id },
      {
        $set:
        {
          password: hashPassword
        }
      });
    res.json(account);


  } catch (error) {
    res.json({ message: error })
  }


}



module.exports.updateImage = async function (req, res) {

  try {



    let updateImage;
    const account = req.params.id;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "User",
      resourse_type: "auto"
    });

    switch (type) {
      case Roles.Management: // admin

        break;
      case Roles.Employee: // employee

        break;
      case Roles.Customer: // customer

        let customer = await Customer.findOne(account = req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(customer.cloudinary_id);

        updateImage = await Customer.updateOne(
          { account: account },
          {
            $set:
            {
              image: result.secure_url,
              cloudinary_id: result.public_id,
            }
          });

        break;
      default:
        res.status(400).message("Not found")
        break;
    }
    res.json(updateImage);


  } catch (error) {

    res.json({ message: error })

  }
}


