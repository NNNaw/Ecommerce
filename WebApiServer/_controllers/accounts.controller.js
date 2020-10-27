const Account = require('../_models/accounts.model')
const Customer = require('../_models/customer.model')
const Employee = require('../_models/employee.model')
const Management = require('../_models/management.model')
const { registerValidation, loginValidation } = require('./../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

module.exports.Login = async function (req, res) {


  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);


  // check account already exist
  const accountExist = await Account.findOne({ account: req.body.account });
  if (!accountExist) return res.status(400).send("Tài khoản hoặc mật khẩu không đúng!");
  // compare password
  const validatePassword = await bcrypt.compare(req.body.password, accountExist.password);
  if (!validatePassword) return res.status(400).send("Mật khẩu không đúng!")



    //Create Token
    const token = jwt.sign({ _id: accountExist._id }, process.env.TOKEN_SECRET);
  
 

  switch (accountExist.Id_AccountType) {

    case "5f897dfc7a0f1b7a330a6b39": // admin
      {
       
        var userExist  = await Management.findOne({ account: accountExist.account});
        const {account,fullName,address,phoneNumber,identitycard,gender,birthday} = userExist;

        var UserAccount = { // detail account + user = token
          account : account,
          Id_AccountType : accountExist.Id_AccountType,
          address : address,
          phoneNumber: phoneNumber,
          identityCard: identitycard,
          fullName: fullName,
          gender : gender,
          birthday:birthday,
          token : token,
        }
        break;
      }
      case "5f897dfc7a0f1b7a330a6b3a" : // nhân viên
      {

        var userExist  = await Employee.findOne({ account: accountExist.account});
        const {account,fullName,address,phoneNumber,identitycard,gender,birthday,accountCreated} = userExist;

        var UserAccount = { // detail account + user = token
          account : account,
          Id_AccountType : accountExist.Id_AccountType,
          address : address,
          phoneNumber: phoneNumber,
          identityCard: identitycard,
          fullName: fullName,
          gender : gender,
          birthday:birthday,
          accountCreated : accountCreated,
          token : token,
        }
        break
      }
    default:
      var userExist  = await Customer.findOne({ account: accountExist.account});
      const {account,fullName,address,phoneNumber,identitycard,gender,birthday} = userExist;

      var UserAccount = { // detail account + user = token
        account : account,
        Id_AccountType : accountExist.Id_AccountType,
        address : address,
        phoneNumber: phoneNumber,
        identityCard: identitycard,
        fullName: fullName,
        gender : gender,
        birthday:birthday,
        token : token,
      }
      break;
     
  }

  //sign to UserAccount

  res.header('auth-token', token).send(UserAccount);
}


module.exports.Register = async function (req, res) {

  console.log(req.body)
  const { error } = registerValidation(req.body);
  
  
  if (error) return res.status(400).send(error.details[0].message);

  
  // check account already exist
  const accountExist = await Account.findOne({ account: req.body.account });
  if (accountExist) return res.status(400).send("Account already exists.");


  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);


  const account = new Account({
    account: req.body.account,
    password: hashPassword,
    dateCreated: req.body.dateCreated,
    Id_AccountType : req.body.Id_AccountType
  });


  var user = new Object();


  switch (req.body.Id_AccountType) {
    case "5f897dfc7a0f1b7a330a6b39": // admin
      {
        user = new Management({
          account: req.body.account,
          fullName: "",
          address: "",
          phoneNumber: "",
          identitycard: "",
          gender:"",
          birthday:"",
        });
       
        break;
      }
      case "5f897dfc7a0f1b7a330a6b3a" : // nhân viên
      {
          user = new Employee({
            account: req.body.account,
            accountCreated: req.body.accountCreated,
            fullName: "",
            address: "",
            phoneNumber: "",
            identitycard: "",
            gender:"",
            birthday:"",

          });
        break
      }
    default:
      user = new Customer({
        account: req.body.account,
        fullName: "",
        address: "",
        phoneNumber: "",
        identitycard: "",
        gender:"",
        birthday:""
      });
      break;
     
  }

  try {
    // save account to db
    const saveAccount = await account.save();
    res.json(saveAccount);

    // save user to db
    const saveUser = await user.save();
    res.json(saveUser);

  } catch (err) {
    res.json({ message: err })
  }
}


