const express = require('express')
const router = express.Router()
const { IdBody, Pwd } = require('../users/users.validators')
const { Validator } = require('../../lib/validator')
const { LocalPassport } = require('./passport')
const { Login, LoginFail, TokenFail } = require('./login.service')

router.post(
  '/',
  [IdBody, Pwd, Validator],
  LocalPassport.authenticate('local', {
    failureRedirect: '/login/fail',
    session: false
  }),
  Login
)
router.get('/fail', LoginFail)
router.get('/token-fail', TokenFail)

module.exports = router
