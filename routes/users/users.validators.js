const { param, body } = require('express-validator')

const IdParam = param('id').notEmpty().isLength({ min: 2, max: 10 })

const IdBody = body('id').notEmpty().isLength({ min: 2, max: 10 })
const Pwd = body('pwd').notEmpty()

module.exports = { IdParam, IdBody, Pwd }
