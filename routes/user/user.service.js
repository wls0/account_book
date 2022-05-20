const httpError = require('http-errors')
const { IdFind, UserCreate } = require('./user.resistor')
const { Send } = require('../../lib')
const { Password, CreateSalt } = require('../../lib')

const CheckUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    const check = await IdFind(id)
    if (!check) {
      return Send(res, true)
    } else {
      throw httpError(409)
    }
  } catch (E) {
    next(E)
  }
}

const CreateUser = async (req, res, next) => {
  try {
    const { id, pwd } = req.body
    const userCheck = await IdFind(id)
    if (!userCheck) {
      const salt = CreateSalt()
      const { password } = Password({ pwd, salt })
      const result = await UserCreate({ id, password, salt })
      if (result) {
        return Send(res, true)
      } else {
        throw httpError(500)
      }
    } else {
      throw httpError(409)
    }
  } catch (E) {
    next(E)
  }
}

module.exports = { CheckUserId, CreateUser }
