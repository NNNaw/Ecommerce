const jwt = require('jsonwebtoken');
const Account = require('./../_models/accounts.model');
const AccountType = require('./../_models/accountTypes.model');
const Customer = require('./../_models/customer.model');

const { roles } = require('./../rolesAccessControl');
const account = require('./../_models/accounts.model');
const Employee = require('../_models/employee.model');
const Management = require('../_models/management.model');
const { Roles } = require('../_common/variable.common');



exports.verifyToken = function (role) {

    return async (req, res, next) => {

        const token = req.header('auth-token');
        console.log("token : ", token)

        if (!token) return res.status(401).send("Access Denied");

        try {

            const { _id, exp } = await jwt.verify(token, process.env.TOKEN_SECRET);
            console.log("_id : ", _id)
            console.log("Epx : ", exp)
            if (exp < Date.now().valueOf() / 1000) {
                return res.status(401).json({
                    error: "Phiên làm việc của bạn đã hết, vui lòng đăng nhập lại để tiếp tục ..."
                });
            }



            switch (role) {

                case Roles.Management:
                    var user = await Management.findById(_id);
                    console.log(user);
                    const management = {
                        _id: user._id,
                        account: user.account
                    }
                    req.managementCreated = management;

                    break;
                case Roles.Employee:
                    var user = await Employee.findById(_id);
                    const employee_product = {
                        _id: user._id,
                        account: user.account
                    }
                    req.employee_product = employee_product;

                    break;
                case Roles.Customer:

                    var user = await Customer.findById(_id);
                    console.log(user)
                    req.Id_UserLogin = user._id;

                    break;
                default:
                    return res.status(401).json({
                        error: "Role người dùng không tồn tại, vui lòng đăng nhập lại để tiếp tục ..."
                    });
            }

            if (!user)
                return res.status(401).json({
                    error: "Id tài khoản người dùng không tồn tại, vui lòng đăng nhập lại để tiếp tục ..."
                });
            next();

        } catch (error) {
            res.status(400).send('Invalid Token');
        }
    }
}

exports.CreateToken = function (id) { // id user
    const token = jwt.sign({ _id: id }, process.env.TOKEN_SECRET, {
        expiresIn: "1d"
    });
    return token;
}


exports.checkAccessCustomer = function () { // check id request and id login is equal?? if === 0 => next()
    return async (req, res, next) => {
        try {
            console.log("req.params ", req.params.id)
            console.log("req.Id_UserLogin : ", req.Id_UserLogin)

            if (req.params.id.localeCompare(req.Id_UserLogin) !== 0) {
                console.log("true")
                res.status(400).send("Không được phép truy cập vào id người dùng khác ...");
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}


exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.name_AccountType)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "Bạn không có quyền truy cập vào api này ..."
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}