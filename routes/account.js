// const express = require("express");
// const router = express.Router();
// const models = require("../models");

// // const User = models.accountUser
// // const Account = require('../models/accountlist')
// const Account = models.account_lists;
// const jwt = require("jsonwebtoken");
// const secret = require("../config/pwd.json");
// const sequelize = require("sequelize");
// const Op = sequelize.Op;
// const err = require("../lib/lib").errorCode;

// // 당일 가계부 확인 // 삭제
// router.get("/:date", async (req, res, next) => {
//   // const token = req.headers.authorization
//   const token = req.cookies.user.access_token;

//   const tokenResult = jwt.verify(token, secret.jwtPwd);
//   const date = req.params.date;
//   const totalCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       date,
//     },
//   });
//   const cashCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       card: "cash",
//       date,
//     },
//   });
//   const shinhanCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       card: "shinhan",
//       date,
//     },
//   });
//   const samsungCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       card: "samsung",
//       date,
//     },
//   });
//   const hyundaiCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       card: "hyundai",
//       date,
//     },
//   });
//   const wooriCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       card: "woori",
//       date,
//     },
//   });
//   const lotteCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       card: "lotte",
//       date,
//     },
//   });
//   const kbCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       card: "kb",
//       date,
//     },
//   });

//   const revenueCost = await Account.sum("cost", {
//     where: {
//       userIndex: tokenResult.id,
//       card: "revenue",
//       date,
//     },
//   });

//   // total, kb, lotte, woori,
//   let total;
//   let kb;
//   let lotte;
//   let woori;
//   let shinhan;
//   let hyundai;
//   let samsung;
//   let cash;
//   let revenue;

//   isNaN(totalCost) === true ? (total = 0) : (total = totalCost);
//   isNaN(kbCost) === true ? (kb = 0) : (kb = kbCost);
//   isNaN(lotteCost) === true ? (lotte = 0) : (lotte = lotteCost);
//   isNaN(wooriCost) === true ? (woori = 0) : (woori = wooriCost);
//   isNaN(shinhanCost) === true ? (shinhan = 0) : (shinhan = shinhanCost);
//   isNaN(hyundaiCost) === true ? (hyundai = 0) : (hyundai = hyundaiCost);
//   isNaN(samsungCost) === true ? (samsung = 0) : (samsung = samsungCost);
//   isNaN(cashCost) === true ? (cash = 0) : (cash = cashCost);
//   isNaN(revenueCost) === true ? (revenue = 0) : (revenue = revenueCost);

//   res.json({
//     total,
//     kb,
//     lotte,
//     woori,
//     shinhan,
//     hyundai,
//     samsung,
//     cash,
//     revenue,
//   });
// });

// // 당일 카드 가계부 확인
// router.get("/card/:card/:date", async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization
//     const token = req.cookies.user.access_token;
//     const tokenResult = jwt.verify(token, secret.jwtPwd);
//     const date = req.params.date;
//     const card = req.params.card;
//     const total = await Account.findAll({
//       where: {
//         userIndex: tokenResult.id,
//         card,
//         date,
//       },
//     });
//     err(res, 200, "", total);
//   } catch (error) {
//     err(res, 401, "다시 로그인 해주세요.");
//   }
// });

// // 가계부 작성
// router.post("/", async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization
//     const token = req.cookies.user.access_token;
//     const tokenResult = jwt.verify(token, secret.jwtPwd);
//     const bigCategory = req.body.bigCategory;
//     const smallCategory = req.body.smallCategory;
//     const card = req.body.card;
//     const cost = Number(req.body.cost);
//     const date = req.body.date;

//     await Account.create({
//       userIndex: tokenResult.id,
//       bigCategory,
//       smallCategory,
//       card,
//       cost,
//       date,
//     });
//     err(res, 200);
//   } catch (error) {
//     err(res, 401, "다시 로그인 해주세요.");
//   }
// });

// // 가계부 수정
// router.put("/", async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization
//     const token = req.cookies.user.access_token;
//     const tokenResult = jwt.verify(token, secret.jwtPwd);
//     const bigCategory = req.body.bigCategory;
//     const smallCategory = req.body.smallCategory;
//     const card = req.body.card;
//     const cost = Number(req.body.cost);
//     const date = req.body.date;
//     const id = req.body.id;
//     await Account.update(
//       {
//         bigCategory,
//         smallCategory,
//         card,
//         cost,
//         date,
//       },
//       {
//         where: { userIndex: tokenResult.id, id },
//       }
//     );
//     err(res, 200);
//   } catch (error) {
//     err(res, 401, "다시 로그인 해주세요.");
//   }
// });

// // 가계부 삭제
// router.delete("/:id", async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization
//     const token = req.cookies.user.access_token;
//     const tokenResult = jwt.verify(token, secret.jwtPwd);
//     const id = req.params.id;
//     const data = await Account.destroy({
//       where: { userIndex: tokenResult.id, id },
//     });
//     if (data) {
//       err(res, 200);
//     } else {
//       err(res, 404, "데이터가 없습니다.");
//     }
//   } catch (error) {
//     err(res, 401, "다시 로그인 해주세요.");
//   }
// });

// // 일별 가계부 확인
// router.get("/day/:day", async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization
//     const token = req.cookies.user.access_token;
//     const tokenResult = jwt.verify(token, secret.jwtPwd);
//     const date = req.params.day;
//     const listData = await Account.findAll({
//       attributes: [
//         "id",
//         "bigCategory",
//         "smallCategory",
//         "card",
//         "cost",
//         "date",
//       ],
//       where: {
//         userIndex: tokenResult.id,
//         date,
//       },
//     });
//     const list = [];
//     let card;
//     for (const a in listData) {
//       if (listData[a].card === "cash") {
//         card = "현금";
//       } else if (listData[a].card === "shinhan") {
//         card = "신한";
//       } else if (listData[a].card === "samsung") {
//         card = "삼성";
//       } else if (listData[a].card === "hyundai") {
//         card = "현대";
//       } else if (listData[a].card === "woori") {
//         card = "우리";
//       } else if (listData[a].card === "lotte") {
//         card = "롯데";
//       } else if (listData[a].card === "kb") {
//         card = "KB";
//       } else if (listData[a].card === "revenue") {
//         card = "수익";
//       }
//       listData[a].card = card;
//       list.push(listData[a]);
//     }

//     const totalCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         date,
//         [Op.or]: [
//           {
//             card: {
//               [Op.notRegexp]: "revenue",
//             },
//           },
//         ],
//       },
//     });

//     const cashCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "cash",
//         date,
//       },
//     });
//     const shinhanCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "shinhan",
//         date,
//       },
//     });
//     const samsungCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "samsung",
//         date,
//       },
//     });
//     const hyundaiCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "hyundai",
//         date,
//       },
//     });
//     const wooriCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "woori",
//         date,
//       },
//     });
//     const lotteCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "lotte",
//         date,
//       },
//     });
//     const kbCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "kb",
//         date,
//       },
//     });
//     const revenueCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "revenue",
//         date,
//       },
//     });
//     let revenue;
//     let total;
//     let kb;
//     let lotte;
//     let woori;
//     let shinhan;
//     let hyundai;
//     let samsung;
//     let cash;

//     // 값이 없다면 NaN발생
//     isNaN(totalCost) === true ? (total = 0) : (total = totalCost);
//     isNaN(kbCost) === true ? (kb = 0) : (kb = kbCost);
//     isNaN(lotteCost) === true ? (lotte = 0) : (lotte = lotteCost);
//     isNaN(wooriCost) === true ? (woori = 0) : (woori = wooriCost);
//     isNaN(shinhanCost) === true ? (shinhan = 0) : (shinhan = shinhanCost);
//     isNaN(hyundaiCost) === true ? (hyundai = 0) : (hyundai = hyundaiCost);
//     isNaN(samsungCost) === true ? (samsung = 0) : (samsung = samsungCost);
//     isNaN(cashCost) === true ? (cash = 0) : (cash = cashCost);
//     isNaN(revenueCost) === true ? (revenue = 0) : (revenue = revenueCost);

//     err(res, 200, "", {
//       list,
//       total,
//       kb,
//       lotte,
//       woori,
//       shinhan,
//       hyundai,
//       samsung,
//       cash,
//       revenue,
//     });
//   } catch (error) {
//     err(res, 401, "다시 로그인 해주세요.");
//   }
// });

// // 월별 총 가계부 확인
// router.get("/month/:date", async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization
//     const token = req.cookies.user.access_token;
//     const tokenResult = jwt.verify(token, secret.jwtPwd);
//     const date = req.params.date;
//     console.log(date);
//     const data = await Account.findAll({
//       where: {
//         userIndex: tokenResult.id,
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const box = [];
//     for (const o in data) {
//       if (data[o].dataValues.card === "revenue") {
//         box.push({
//           date: data[o].dataValues.date,
//           cost: 0,
//           revenue: data[o].dataValues.cost,
//         });
//       } else {
//         box.push({
//           date: data[o].dataValues.date,
//           cost: data[o].dataValues.cost,
//           revenue: 0,
//         });
//       }
//     }

//     const costList = [];
//     box.reduce((res, value) => {
//       if (!res[value.date]) {
//         res[value.date] = {
//           date: value.date,
//           cost: 0,
//           revenue: 0,
//           open: false,
//         };
//         costList.push(res[value.date]);
//       }
//       res[value.date].cost += value.cost;
//       res[value.date].revenue += value.revenue;
//       return res;
//     }, {});

//     const totalCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//             card: {
//               [Op.notRegexp]: "revenue",
//             },
//           },
//         ],
//       },
//     });
//     const cashCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "cash",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const shinhanCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "shinhan",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const samsungCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "samsung",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const hyundaiCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "hyundai",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const wooriCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "woori",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const lotteCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "lotte",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const kbCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "kb",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const revenueCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "revenue",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     let revenue;
//     let total;
//     let kb;
//     let lotte;
//     let woori;
//     let shinhan;
//     let hyundai;
//     let samsung;
//     let cash;

//     isNaN(totalCost) === true ? (total = 0) : (total = totalCost);
//     isNaN(kbCost) === true ? (kb = 0) : (kb = kbCost);
//     isNaN(lotteCost) === true ? (lotte = 0) : (lotte = lotteCost);
//     isNaN(wooriCost) === true ? (woori = 0) : (woori = wooriCost);
//     isNaN(shinhanCost) === true ? (shinhan = 0) : (shinhan = shinhanCost);
//     isNaN(hyundaiCost) === true ? (hyundai = 0) : (hyundai = hyundaiCost);
//     isNaN(samsungCost) === true ? (samsung = 0) : (samsung = samsungCost);
//     isNaN(cashCost) === true ? (cash = 0) : (cash = cashCost);
//     isNaN(revenueCost) === true ? (revenue = 0) : (revenue = revenueCost);

//     err(res, 200, "", {
//       costList,
//       total,
//       kb,
//       lotte,
//       woori,
//       shinhan,
//       hyundai,
//       samsung,
//       cash,
//       revenue,
//     });
//   } catch (error) {
//     err(res, 401, "다시 로그인 해주세요.");
//   }
// });

// // 년별 가계부 확인
// router.get("/year/:year", async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization
//     const token = req.cookies.user.access_token;

//     const tokenResult = jwt.verify(token, secret.jwtPwd);
//     const date = req.params.year;

//     const data = await Account.findAll({
//       where: {
//         userIndex: tokenResult.id,
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const box = [];
//     // let date
//     // try {

//     for (const o in data) {
//       if (data[o].dataValues.card === "revenue") {
//         box.push({
//           date: data[o].dataValues.date,
//           cost: 0,
//           revenue: data[o].dataValues.cost,
//         });
//       } else {
//         box.push({
//           date: data[o].dataValues.date,
//           cost: data[o].dataValues.cost,
//           revenue: 0,
//         });
//       }
//     }
//     const costList = [];
//     box.reduce(function (res, value) {
//       if (!res[value.date]) {
//         res[value.date] = {
//           date: value.date,
//           cost: 0,
//           revenue: 0,
//           open: false,
//         };
//         costList.push(res[value.date]);
//       }
//       res[value.date].cost += value.cost;
//       res[value.date].revenue += value.revenue;
//       return res;
//     }, {});

//     const totalCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//             card: {
//               [Op.notRegexp]: "revenue",
//             },
//           },
//         ],
//       },
//     });
//     const cashCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "cash",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const shinhanCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "shinhan",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const samsungCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "samsung",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const hyundaiCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "hyundai",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const wooriCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "woori",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const lotteCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "lotte",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const kbCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "kb",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });
//     const revenueCost = await Account.sum("cost", {
//       where: {
//         userIndex: tokenResult.id,
//         card: "revenue",
//         [Op.or]: [
//           {
//             date: {
//               [Op.like]: date + "%",
//             },
//           },
//         ],
//       },
//     });

//     let revenue;
//     let total;
//     let kb;
//     let lotte;
//     let woori;
//     let shinhan;
//     let hyundai;
//     let samsung;
//     let cash;

//     isNaN(totalCost) === true ? (total = 0) : (total = totalCost);
//     isNaN(kbCost) === true ? (kb = 0) : (kb = kbCost);
//     isNaN(lotteCost) === true ? (lotte = 0) : (lotte = lotteCost);
//     isNaN(wooriCost) === true ? (woori = 0) : (woori = wooriCost);
//     isNaN(shinhanCost) === true ? (shinhan = 0) : (shinhan = shinhanCost);
//     isNaN(hyundaiCost) === true ? (hyundai = 0) : (hyundai = hyundaiCost);
//     isNaN(samsungCost) === true ? (samsung = 0) : (samsung = samsungCost);
//     isNaN(cashCost) === true ? (cash = 0) : (cash = cashCost);
//     isNaN(revenueCost) === true ? (revenue = 0) : (revenue = revenueCost);

//     err(res, 200, "", {
//       costList,
//       total,
//       kb,
//       lotte,
//       woori,
//       shinhan,
//       hyundai,
//       samsung,
//       cash,
//       revenue,
//     });
//   } catch (error) {
//     err(res, 401, "다시 로그인 해주세요.");
//   }
// });

// module.exports = router;
