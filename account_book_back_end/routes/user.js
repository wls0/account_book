const express = require('express')
const router = express.Router()
const models = require('../models')
const crypto = require('crypto')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const secret = require('../config/pwd.json')

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password'
},
async (id, password, done) => {
  const data = await models.accountUser.findOne({ where: { userId: id } })
  if (data) {
    const pwd = crypto.createHash('sha512').update(password + data.salt).digest('hex')
    pwd === data.password ? done(null, data) : done(null, false)
  } else {
    return done(null, false)
  }
}
))

router.post('/signup', async (req, res, next) => {
  const body = req.body
  const salt = Math.round(new Date().valueOf() + Math.random()) + ''
  const password = crypto.createHash('sha512').update(body.password + salt).digest('hex')
  const find = await models.accountUser.findOne({ where: { userId: body.id } })
  if (find) {
    console.log('아이디 존재')
  } else if (body.id !== '' || body.password !== '') {
    await models.accountUser.create({
      userId: body.id,
      password,
      salt: salt
    })
    res.json('done')
  } else {
    console.log('값이 비어있음')
  }
})

// 로그인 시 토큰 발행
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/user/fail', session: false }),
  async (req, res, err) => {
    const user = req.user
    const accessToken = jwt.sign({
      id: user.id
    }, secret.jwtPwd,
    {
      expiresIn: '30d',
      issuer: 'localhost',
      subject: 'user_info'
    })
    const token = { access_token: accessToken }
    res.cookie('user', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    res.json(token)
  })

// 로그인시 아이디,비밀번호가 틀렸을때
router.get('/fail', (req, res, next) => {
  res.json('틀림')
  console.log('아이디 비밀번호 틀림')
})

module.exports = router
