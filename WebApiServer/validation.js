const Joi = require('@hapi/joi');


const registerValidation = (data) =>{
  
  const schema = Joi.object().keys({
      account : Joi.string().min(6).required().messages({
        'string.base': `"Tài khoản" không được phép có 'ký tự'`,
        'string.empty': `"Tài khoản" không được phép bỏ trống`,
        'string.min': `"Tài khoản" phải có ít nhất {#limit} ký tự` ,
        'any.required': `"Tài khoản" is a required field`
      }),
     
      password : Joi.string().min(6).required().messages({
        'string.base': `"Mật khẩu" không được phép có 'ký tự'`,
        'string.empty': `"Mật khẩu" không được phép bỏ trống`,
        'string.min': `"Mật khẩu" phải có ít nhất {#limit} ký tự` ,
        'any.required': `"Mật khẩu" is a required field`
      }),
      confirmPassword : Joi.string().min(6).required().messages({
        'string.base': `"Mật khẩu" không được phép có 'ký tự'`,
        'string.empty': `"Mật khẩu" không được phép bỏ trống`,
        'string.min': `"Mật khẩu" phải có ít nhất {#limit} ký tự` ,
        'any.required': `"Mật khẩu" is a required field`
      }),
    });
    return schema.validate(data)
}

const loginValidation = (data) =>{
  
    const schema = Joi.object().keys({
        account : Joi.string().min(6).required().messages({
          'string.base': `"Tài khoản" không được phép có 'ký tự'`,
          'string.empty': `"Tài khoản" không được phép bỏ trống`,
          'string.min': `"Tài khoản" phải có ít nhất {#limit} ký tự` ,
          'any.required': `"Tài khoản" is a required field`
        }),
       
        password : Joi.string().min(6).required().messages({
          'string.base': `"Mật khẩu" không được phép có 'ký tự'`,
          'string.empty': `"Mật khẩu" không được phép bỏ trống`,
          'string.min': `"Mật khẩu" phải có ít nhất {#limit} ký tự` ,
          'any.required': `"Mật khẩu" is a required field`
        }),


      });
      return schema.validate(data)
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;