const express = require('express')
const router = express.Router()
const { Validator } = require('../../lib/validator')
const { CheckUserId, CreateUser } = require('./users.service')
const { IdParam, IdBody, Pwd } = require('./users.validators')

router.get('/:id', [IdParam, Validator], CheckUserId)
router.post('/signup', [IdBody], [Pwd, Validator], CreateUser)

module.exports = router
