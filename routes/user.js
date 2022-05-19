// const express = require("express");
// const router = express.Router();
// const models = require("../models");
// const User = models.account_users;
// const crypto = require("crypto");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const jwt = require("jsonwebtoken");
// const secret = require("../config/pwd.json");
// const err = require("../lib/lib").errorCode;

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "id",
//       passwordField: "password",
//     },
//     async (id, password, done) => {
//       const data = await User.findOne({ where: { userId: id } });
//       if (data) {
//         const pwd = crypto
//           .createHash("sha512")
//           .update(password + data.salt)
//           .digest("hex");
//         pwd === data.password ? done(null, data) : done(null, false);
//       } else {
//         return done(null, false);
//       }
//     }
//   )
// );
// let check = false;

// // 중복아이디 확인
// router.get("/signup/:id", async (req, res, next) => {
//   const id = req.params.id;
//   const find = await User.findOne({ where: { userId: id } });
//   if (!id) {
//     err(res, 403, "값을 입력해주세요.");
//   } else {
//     if (!find) {
//       check = true;
//       err(res, 200);
//     } else {
//       err(res, 409, "중복아이디가 존재합니다.");
//     }
//   }
// });

// // 회원가입
// router.post("/signup", async (req, res, next) => {
//   const body = req.body;
//   const salt = Math.round(new Date().valueOf() + Math.random()) + "";
//   const password = crypto
//     .createHash("sha512")
//     .update(body.password + salt)
//     .digest("hex");
//   const find = await User.findOne({ where: { userId: body.id } });
//   if (find) {
//     err(res, 409, "중복아이디가 존재합니다.");
//   } else if (body.id !== "" || body.password !== "") {
//     if (check === true) {
//       await User.create({
//         userId: body.id,
//         password,
//         salt: salt,
//       });
//       err(res, 200);
//     } else {
//       err(res, 401, "아이디 중복확인을 해주세요.");
//     }
//   } else {
//     err(res, 403, "값을 입력해주세요.");
//   }
// });

// // 로그인 시 토큰 발행
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/user/fail",
//     session: false,
//   }),
//   async (req, res, error) => {
//     const user = req.user;
//     const accessToken = jwt.sign(
//       {
//         id: user.id,
//       },
//       secret.jwtPwd,
//       {
//         expiresIn: "30d",
//         issuer: "localhost",
//         subject: "user_info",
//       }
//     );
//     const token = { access_token: accessToken };
//     res.cookie("user", token, {
//       httpOnly: true,
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//     });
//     err(res, 200, "", token);
//   }
// );

// // 로그인시 아이디,비밀번호가 틀렸을때
// router.get("/fail", (req, res, next) => {
//   err(res, 401, "아이디혹은 비밀번호가 틀렸습니다.");
// });

// module.exports = router;
