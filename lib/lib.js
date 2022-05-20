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

const Password = (data) => {
  const { pwd, salt } = data
  const password = crypto
    .createHash('sha512')
    .update(pwd + salt)
    .digest('hex')
  return { password }
}

const CreateSalt = () => {
  const salt = Math.round(new Date().valueOf() + Math.random()) + ''
  return salt
}

module.exports = { Error, Send, Password, CreateSalt }
