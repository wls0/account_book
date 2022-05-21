const express = require('express')
const router = express.Router()
const { LocalPassport } = require('./passport')
const { Login, LoginFail, TokenFail } = require('./login.service')

router.post(
  '/',
  LocalPassport.authenticate('local', {
    failureRedirect: '/login/fail',
    session: false
  }),
  Login
)
router.post('/access-token')
router.get('/fail', LoginFail)
router.get('/token-fail', TokenFail)

module.exports = router
