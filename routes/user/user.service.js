const { IdFind, UserCreate } = require('./user.resistor')
const { Send } = require('../../lib')
const httpError = require('http-errors')

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
      const result = await UserCreate({ id, pwd })
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
