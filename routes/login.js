const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GoogleAuth = require('../config/auth.json')

passport.use(
  new GoogleStrategy(
    {
      clientID: GoogleAuth.ID,
      clientSecret: GoogleAuth.PASSWORD,
      callbackURL: '/auth/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user)
      })
    }
  )
)

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GoogleAuth.ID,
//       clientSecret: GoogleAuth.PASSWORD,
//       callbackURL: "/auth/google/callback",
//       authType: "reauthenticate"
//     },
//     function (accessToken, refreshToken, profile, done) {
//       var _profile = profile._json
//       console.log(_profile)
//       loginByThirdparty(
//         {
//           auth_type: "google",
//           auth_name: _profile.given_name,
//           auth_email: _profile.email
//         },
//         done
//       )
//     }
//   )
// )

router.get(
  '/auth/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

module.exports = router
