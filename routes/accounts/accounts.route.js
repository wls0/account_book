const express = require('express')
const router = express.Router()
const { Validator } = require('../../lib/validator')
const {
  Index,
  DateBody,
  DateParam,
  BigCategoryBody,
  SmallCategoryBody,
  CardBody,
  CostBody,
  Month,
  Year,
  Card
} = require('./accounts.validators')
const {
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
  DayAccountFind,
  CardAccountFind
} = require('./accounts.service')

// 가계부 작성
router.post(
  '/:date',
  [
    DateParam,
    BigCategoryBody,
    SmallCategoryBody,
    CardBody,
    CostBody,
    Validator
  ],
  CreateAccount
)

// 가계부 수정
router.patch(
  '/:index',
  [
    Index,
    DateBody,
    BigCategoryBody,
    SmallCategoryBody,
    CardBody,
    CostBody,
    Validator
  ],
  UpdateAccount
)

// 가계부 삭제
router.delete('/:index', [Index, Validator], DeleteAccount)

// 해당 날짜 가계부 확인
router.get('/day/:date', [DateParam, Validator], DayAccountFind)

// 월 별 가계부 확인
router.get('/month/:month', [Month, Validator], DayAccountFind)

// 년 별 가계부 확인
router.get('/year/:year', [Year, Validator], DayAccountFind)

// 해당 날짜 카드별 상세 확인
router.get(
  '/card/:card/day/:date',
  [Card, DateParam, Validator],
  CardAccountFind
)

module.exports = router
