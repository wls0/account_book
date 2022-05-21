const express = require('express')
const router = express.Router()
const {
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
  DayAccountFind,
  CardAccountFind
} = require('./accounts.service')

// 가계부 작성
router.post('/:date', CreateAccount)

// 가계부 수정
router.patch('/:index', UpdateAccount)

// 가계부 삭제
router.delete('/:index', DeleteAccount)

// 해당 날짜 가계부 확인
router.get('/day/:date', DayAccountFind)

// 월 별 가계부 확인
router.get('/month/:month', DayAccountFind)

// 년 별 가계부 확인
router.get('/year/:year', DayAccountFind)

// 해당 날짜 카드별 상세 확인
router.get('/card/:card/day/:date', CardAccountFind)

module.exports = router
