const passport = require('passport')
const localPassport = require('passport-local')
const jwtPassport = require('passport-jwt')
const Users = require('../../models/user')
const { Password } = require('../../lib/lib')
const LocalStrategy = localPassport.Strategy
const JwtStrategy = jwtPassport.Strategy
const ExtractJwt = jwtPassport.ExtractJwt
const JWT = process.env.JWT

const LocalPassport = passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'pwd'
    },
    async (id, pwd, done) => {
      const user = await Users.findOne({ where: { id } })
      if (user === null) {
        return done(null, false)
      } else {
        const userPassword = user.password
        const salt = user.salt
        const pwdCheck = Password({ pwd, salt })
        if (userPassword === pwdCheck) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      }
    }
  )
)

const JwtPassport = passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: JWT
    },
    async (payload, done) => {
      try {
        const index = payload.user.index
        const user = await Users.findOne({ where: { index } })
        if (user) {
          return done(null, user.index)
        } else {
          return done(null, false)
        }
      } catch (E) {
        return done(E)
      }
    }
  )
)

module.exports = { LocalPassport, JwtPassport }
