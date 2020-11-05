const Account = require('../_models/accounts.model')
const Customer = require('../_models/customer.model')
const Employee = require('../_models/employee.model')
const Management = require('../_models/management.model')

const { registerValidation, loginValidation } = require('./../validation')
// const checkRole = require('./../_common/handleUploadFile')
// const idType = require('./../_common/variable.common')
//import handle tokens
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

        var userExist = await Management.findOne({ account: accountExist.account });
        const { account, fullName, address, phoneNumber, identitycard, gender, birthday } = userExist;

        var UserAccount = { // detail account + user = token
          account: account,
          Id_AccountType: accountExist.Id_AccountType,
          address: address,

          phoneNumber: phoneNumber,
          identityCard: identitycard,
          fullName: fullName,
          gender: gender,
          birthday: birthday,
          token: token,
        }
        break;
      }
    case "5f897dfc7a0f1b7a330a6b3a": // nhân viên
      {

        var userExist = await Employee.findOne({ account: accountExist.account });
        const { account, fullName, address, phoneNumber, identitycard, gender, birthday, accountCreated } = userExist;

        var UserAccount = { // detail account + user = token
          account: account,
          Id_AccountType: accountExist.Id_AccountType,
          address: address,
          phoneNumber: phoneNumber,
          identityCard: identitycard,
          fullName: fullName,
          gender: gender,
          birthday: birthday,
          accountCreated: accountCreated,
          token: token,
        }
        break
      }
    default:


      var userExist = await Customer.findOne({ account: accountExist.account });




      const { account, fullName, address, phoneNumber, identitycard, gender, birthday, image, displayName } = userExist;

      var UserAccount = { // detail account + user = token
        account: account,
        Id_AccountType: accountExist.Id_AccountType,
        address: address,
        image: image,
        displayName: displayName,
        phoneNumber: phoneNumber,
        identityCard: identitycard,
        fullName: fullName,
        gender: gender,
        birthday: birthday,
        token: token,
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
    Id_AccountType: req.body.Id_AccountType
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
          gender: "",
          birthday: "",
        });

        break;
      }
    case "5f897dfc7a0f1b7a330a6b3a": // nhân viên
      {
        user = new Employee({
          account: req.body.account,
          accountCreated: req.body.accountCreated,
          fullName: "",
          address: "",
          phoneNumber: "",
          identitycard: "",
          gender: "",
          birthday: "",

        });
        break
      }
    default:
      user = new Customer({
        account: req.body.account,
        fullName: "No Name",
        displayName: req.body.displayName,
        image: "uploads/avatarDefault.png",
        address: "No address",
        phoneNumber: 1711061117,
        identitycard: 1711061117,
        gender: "Nam",
        birthDay: Date.now()
      });
      break;

  }

  try {
    // stupid code
    // save account to db
    // const saveAccount = await account.save();
    // res.json(saveAccount);
    // save user to db
    //  const saveUser = await user.save();

    console.log(user)

    const xyz = await Promise.all([account.save(), user.save()]);

    res.status(200).json(xyz);

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

module.exports.GetCustomer = async function (req, res) {  
  let accountId = req.params.id; // user name
  console.log("GetCustomer" , req.params.id)

  var account = await Account.findOne({ account: accountId });
  var customer = await Customer.findOne({ account: accountId });

  let infoAccount = { // detail info aaccount
  

    account: account.account,

    dateCreated: account.dateCreated,
    Id_AccountType: account.Id_AccountType,


    displayName: customer.displayName,
    fullName: customer.fullName,
    image: customer.image,
    address: customer.address,
    phoneNumber: customer.phoneNumber,
    identitycard: customer.identitycard,
    gender: customer.gender,
    birthDay: customer.birthDay
    
  }

  res.json(infoAccount);

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
    res.json({ message: err })
  }


}



module.exports.updateImage = async function (req, res) {

  try {
   
    var type = checkRole(req.Id_AccountType)
    console.log(type)
    let updateImage;
    const account = req.params.id
    switch (type) {
      case 1: // admin

        break;
      case 2: // employee

        break;
      case 3: // customer
        updateImage = await Customer.updateOne(
          { account: account },
          {
            $set:
            {
              image: `uploads/${req.file.filename}`
            }
          });

        break;
      default:
        res.status(400).message("Not found")
        break;
    }
    res.json(updateImage);


  } catch (error) {

    res.json({ message: err })

  }
}


function checkRole(id) {
  let idTypeCutomer = "5f897dfc7a0f1b7a330a6b3b",
    idTypeEmplopyee = "5f897dfc7a0f1b7a330a6b3a",
    idTypeManagement = "5f897dfc7a0f1b7a330a6b39"; // also var, const

  switch (id) {
    case idTypeManagement:
      return 1;
    // break;
    case idTypeEmplopyee:
      return 2;
    // break;
    case idTypeCutomer:
      return 3;
    // break;
    default:
      return 3;
    // break;
  }
};