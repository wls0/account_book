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
  const data = await models.account_users.findOne({ where: { userId: id } })
  if (data) {
    const pwd = crypto.createHash('sha512').update(password + data.salt).digest('hex')
    pwd === data.password ? done(null, data) : done(null, false)
  } else {
    return done(null, false)
  }
}
))
let check = false
//중복아이디 확인
router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  console.log(id)
  const find = await models.account_users.findOne({where:{userId:id}})
  if(!find){
    check = true
    json({data:'ok'})
  }else{
    res.status(403).json({data:'fail'})
  }
})
//회원가입
router.post('/signup', async (req, res, next) => {
  const body = req.body
  const salt = Math.round(new Date().valueOf() + Math.random()) + ''
  const password = crypto.createHash('sha512').update(body.password + salt).digest('hex')
  const find = await models.account_users.findOne({ where: { userId: body.id } })
  if (find) {
    res.status(409).json({data:'fail'})
  } else if (body.id !== '' || body.password !== '') {
    if(check === true){
      await models.account_users.create({
        userId: body.id,
        password,
        salt: salt
      })
      res.status(200).json({data:'ok'})
    }else{
      res.status(403).json({data:'fail'})
    }
  } else {
    res.status(412).json({data:'fail'})
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
    res.status(200).json({data:'ok',token})
  })

// 로그인시 아이디,비밀번호가 틀렸을때
router.get('/fail', (req, res, next) => {
  res.status(401).json({data:'fail'})
})

module.exports = router
