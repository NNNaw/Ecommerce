const Account = require('../_models/accounts.model')
const User = require('../_models/users.model')

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
  res.header('auth-token', token).send(token);
}
module.exports.Register = async function (req, res) {

  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  
  // check account already exist
  const accountExist = await Account.findOne({ account: req.body.account });
  if (accountExist) return res.status(400).send("Account already exists.");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const account = new Account({
    account: req.body.account,
    password: hashPassword,
    dateCreated: req.body.dateCreated,
  });
  const user = new User({
    account: req.body.account,
    fullName: "",
    address: "",
    phoneNumber: "",
    identitycard: "",
  
  });
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


