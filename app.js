const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const userRouter = require('./routes/user')
const cors = require('cors')
const accountRouter = require('./routes/account')
const models = require('./models/index.js').sequelize
const jwt = require('jsonwebtoken')
const secret = require('./config/pwd.json')
const err = require('./lib/error').errorCode

models.sync().then(() => {
  console.log(' DB 연결 성공')
})
  .catch((err) => {
    console.log('연결 실패')
    console.log(err)
  })

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())

app.use('/user', userRouter)
// app.use('/account', accountRouter)

app.use('/account', (req, res, next) => {
  try {
    // req.headers.authorization
    req.cookies.user.access_token ? app.use('/account', accountRouter) : err(res, 401,'로그인 후 이동해주세요.')
    // jwt.verify(req.cookies.user.access_token, secret.jwtSecret)  
    // jwt.verify(req.headers.authorization, secret.jwtSecret)

  } catch (error) {
    err(res, 401,'로그인 후 이용해주세요.')
  }
  next()
})


//catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404))
// })

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   // res.render('error')
// })

module.exports = app
