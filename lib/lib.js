const crypto = require('crypto')
const Error = (err, req, res, next) => {
  res.status(err.statusCode).json({
    code: err.statusCode,
    result: false,
    msg: err.message,
    data: ''
  })
}

const Send = (res, data) => {
  res.status(200).json({
    code: 200,
    result: true,
    msg: '',
    data
  })
}

const PasswordCoder = (pwd) => {
  const salt = Math.round(new Date().valueOf() + Math.random()) + ''
  const password = crypto
    .createHash('sha512')
    .update(pwd + salt)
    .digest('hex')
  return { password, salt }
}

module.exports = { Error, Send, PasswordCoder }
