require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const cors = require('cors')
const httpError = require('http-errors')

const { Error } = require('./lib/lib')
const userRouter = require('./routes/users/users.route')
const loginRouter = require('./routes/login/login.route')
const accountRouter = require('./routes/accounts/accounts.route')
const { sequelize } = require('./models/index')
const { JwtPassport } = require('./routes/login/passport')

if (process.env.NODE_ENV === 'local') {
  sequelize
    .sync()
    .then(() => {
      console.log(' DB 연결 성공')
    })
    .catch((err) => {
      console.log('연결 실패')
      console.log(err)
    })
}

const app = express()

app.use(
  cors({
    origin: process.env.CORS,
    credentials: true
  })
)

app.use(compression())
app.use(logger('dev'))
app.use(express.json())

app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use(
  '/accounts',
  JwtPassport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login/token-fail'
  }),
  accountRouter
)

app.use(() => {
  throw httpError(404)
})

app.use(Error)

app.listen(3000, () => {
  console.log('server start!')
})

module.exports = app
