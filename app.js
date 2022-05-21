require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const cors = require('cors')

const { Error } = require('./lib/lib')
const userRouter = require('./routes/users/users.route')
const loginRouter = require('./routes/login/login.route')
// const accountRouter = require('./routes/account')
const { sequelize } = require('./models/index')

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
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/login', loginRouter)
// app.use('/account', accountRouter)

app.use(Error)

app.listen(3000, () => {
  console.log('server start!')
})

module.exports = app
