const express = require('express')
const router = express.Router()
const models = require('../models')

// const User = models.accountUser
// const Account = require('../models/accountlist')
const Account = models.accountList
const jwt = require('jsonwebtoken')
const secret = require('../config/pwd.json')
const sequelize = require('sequelize')
const Op = sequelize.Op

// 당일 가계부 확인
router.get('/:date', async (req, res, next) => {
  // const token = req.headers.authorization
  const token = req.cookies.user.access_token
  const tokenResult = jwt.verify(token, secret.jwtPwd)
  const date = req.params.date
  const totalCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      date
    }
  })
  const cashCost = await Account.sum('cost', {
    where:
    {
      userIndex: tokenResult.id,
      card: 'cash',
      date
    }
  })
  const shinhanCost = await Account.sum('cost', {
    where:
    {
      userIndex: tokenResult.id,
      card: 'shinhan',
      date
    }
  })
  const samsungCost = await Account.sum('cost', {
    where:
    {
      userIndex: tokenResult.id,
      card: 'samsung',
      date
    }
  })
  const hyundaiCost = await Account.sum('cost', {
    where:
    {
      userIndex: tokenResult.id,
      card: 'hyundai',
      date
    }
  })
  const wooriCost = await Account.sum('cost', {
    where:
    {
      userIndex: tokenResult.id,
      card: 'woori',
      date
    }
  })
  const lotteCost = await Account.sum('cost', {
    where:
    {
      userIndex: tokenResult.id,
      card: 'lotte',
      date
    }
  })
  const kbCost = await Account.sum('cost', {
    where:
    {
      userIndex: tokenResult.id,
      card: 'kb',
      date
    }
  })
  console.log(isNaN(kbCost))
  // total, kb, lotte, woori,
  let total
  let kb
  let lotte
  let woori
  let shinhan
  let hyundai
  let samsung
  let cash

  isNaN(totalCost) === true ? total = 0 : total = totalCost
  isNaN(kbCost) === true ? kb = 0 : kb = kbCost
  isNaN(lotteCost) === true ? lotte = 0 : lotte = lotteCost
  isNaN(wooriCost) === true ? woori = 0 : woori = wooriCost
  isNaN(shinhanCost) === true ? shinhan = 0 : shinhan = shinhanCost
  isNaN(hyundaiCost) === true ? hyundai = 0 : hyundai = hyundaiCost
  isNaN(samsungCost) === true ? samsung = 0 : samsung = samsungCost
  isNaN(cashCost) === true ? cash = 0 : cash = cashCost

  res.json({ total, kb, lotte, woori, shinhan, hyundai, samsung, cash })
})

// 당일 카드 가계부 확인
router.get('/card/:card/:date', async (req, res, next) => {
  // const token = req.headers.authorization
  const token = req.cookies.user.access_token
  const tokenResult = jwt.verify(token, secret.jwtPwd)
  const date = req.params.date
  const card = req.params.card
  const total = await Account.findAll({
    where: {
      userIndex: tokenResult.id,
      card,
      date
    }
  })
  console.log(total)

  res.json(total)
})

// 가계부 작성
router.post('/', async (req, res, next) => {
  // const token = req.headers.authorization
  const token = req.cookies.user.access_token
  const tokenResult = jwt.verify(token, secret.jwtPwd)
  const bigCategory = req.body.bigCategory
  const smallCategory = req.body.smallCategory
  const card = req.body.card
  const cost = Number(req.body.cost)
  const date = req.body.date
  const memo = req.body.memo
  await Account.create({
    userIndex: tokenResult.id,
    bigCategory,
    smallCategory,
    card,
    cost,
    date,
    memo
  })
  res.json('done')
})

// 가계부 수정
router.put('/', async (req, res, next) => {
  // const token = req.headers.authorization
  const token = req.cookies.user.access_token
  const tokenResult = jwt.verify(token, secret.jwtPwd)
  const bigCategory = req.body.bigCategory
  const smallCategory = req.body.smallCategory
  const card = req.body.card
  const cost = Number(req.body.cost)
  const date = req.body.date
  const memo = req.body.memo
  const id = req.body.id
  await Account.update({
    bigCategory,
    smallCategory,
    card,
    cost,
    date,
    memo
  }, {
    where: { userIndex: tokenResult.id, id }
  })
  res.json('done')
})

// 가계부 삭제
router.delete('/:id', async (req, res, next) => {
  // const token = req.headers.authorization
  const token = req.cookies.user.access_token
  const tokenResult = jwt.verify(token, secret.jwtPwd)
  const id = req.params.id
  const data = await Account.destroy({
    where: { userIndex: tokenResult.id, id }
  })
  if (data) {
    res.json('done')
  } else {
    console.log('데이터가 없습니다.')
  }
})

// // 일별 가계부 확인
// router.get('/day/:year/:month/:day', async (req, res, next) => {
//   // const token = req.headers.authorization
//   const token = req.cookies.user.access_token
//   const tokenResult = jwt.verify(token, secret.jwtPwd)
//   const year = req.params.year
//   const month = req.params.month
//   const day = req.params.day
//   const date = year + '-' + month + '-' + day
//   const data = await Account.findAll({
//     where:
//     {
//       userIndex: tokenResult.id, date
//     }
//   })
//   res.json(data)
// })

// 월별 총 가계부 확인
router.get('/month/:date', async (req, res, next) => {
  // const token = req.headers.authorization
  const token = req.cookies.user.access_token
  const tokenResult = jwt.verify(token, secret.jwtPwd)
  const date = req.params.date
  const totalCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const cashCost = await Account.sum('cost', {

    where: {
      userIndex: tokenResult.id,
      card: 'cash',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const shinhanCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'shinhan',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const samsungCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'samsung',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const hyundaiCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'hyundai',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const wooriCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'woori',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const lotteCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'lotte',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const kbCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'kb',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let total
  let kb
  let lotte
  let woori
  let shinhan
  let hyundai
  let samsung
  let cash

  isNaN(totalCost) === true ? total = 0 : total = totalCost
  isNaN(kbCost) === true ? kb = 0 : kb = kbCost
  isNaN(lotteCost) === true ? lotte = 0 : lotte = lotteCost
  isNaN(wooriCost) === true ? woori = 0 : woori = wooriCost
  isNaN(shinhanCost) === true ? shinhan = 0 : shinhan = shinhanCost
  isNaN(hyundaiCost) === true ? hyundai = 0 : hyundai = hyundaiCost
  isNaN(samsungCost) === true ? samsung = 0 : samsung = samsungCost
  isNaN(cashCost) === true ? cash = 0 : cash = cashCost

  res.json({ total, kb, lotte, woori, shinhan, hyundai, samsung, cash })
})

// 년별 가계부 확인
router.get('/year/:year', async (req, res, next) => {
  // const token = req.headers.authorization
  const token = req.cookies.user.access_token
  const tokenResult = jwt.verify(token, secret.jwtPwd)
  const date = req.params.year
  const totalCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const cashCost = await Account.sum('cost', {

    where: {
      userIndex: tokenResult.id,
      card: 'cash',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const shinhanCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'shinhan',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const samsungCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'samsung',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const hyundaiCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'hyundai',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const wooriCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'woori',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const lotteCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'lotte',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  const kbCost = await Account.sum('cost', {
    where: {
      userIndex: tokenResult.id,
      card: 'kb',
      [Op.or]: [
        {
          date: {
            [Op.like]: date + '%'
          }
        }
      ]
    }
  })
  let total
  let kb
  let lotte
  let woori
  let shinhan
  let hyundai
  let samsung
  let cash

  isNaN(totalCost) === true ? total = 0 : total = totalCost
  isNaN(kbCost) === true ? kb = 0 : kb = kbCost
  isNaN(lotteCost) === true ? lotte = 0 : lotte = lotteCost
  isNaN(wooriCost) === true ? woori = 0 : woori = wooriCost
  isNaN(shinhanCost) === true ? shinhan = 0 : shinhan = shinhanCost
  isNaN(hyundaiCost) === true ? hyundai = 0 : hyundai = hyundaiCost
  isNaN(samsungCost) === true ? samsung = 0 : samsung = samsungCost
  isNaN(cashCost) === true ? cash = 0 : cash = cashCost

  res.json({ total, kb, lotte, woori, shinhan, hyundai, samsung, cash })
})

module.exports = router
