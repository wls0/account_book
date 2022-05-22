const { validationResult } = require('express-validator')
const httpError = require('http-errors')

const Validator = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw httpError(400)
  }
  next()
}

module.exports = { Validator }
