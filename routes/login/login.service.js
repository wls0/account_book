const httpError = require('http-errors')
const { Send } = require('../../lib/lib')
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT
const Login = async (req, res, next) => {
  try {
    const user = req.user
    const info = {
      check: user.index
    }
    const accessToken = jwt.sign(info, JWT, {
      expiresIn: '1d',
      issuer: 'localhost',
      subject: 'userInfo'
    })
    return Send(res, accessToken)
  } catch (E) {
    next(E)
  }
}

const LoginFail = async (req, res, next) => {
  try {
    throw httpError(404)
  } catch (E) {
    next(E)
  }
}

const TokenFail = async (req, res, next) => {
  try {
    throw httpError(401)
  } catch (E) {
    next(E)
  }
}

module.exports = { Login, LoginFail, TokenFail }
