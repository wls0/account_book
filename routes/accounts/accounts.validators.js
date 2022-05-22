const { param, body } = require('express-validator')

const Index = param('index').notEmpty().isNumeric()

const DateBody = body('date')
  .notEmpty()
  .isLength(10)
  .matches(/\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g)
const DateParam = param('date')
  .notEmpty()
  .isLength(10)
  .matches(/\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g)

const BigCategoryBody = body('bigCategory').notEmpty()
const SmallCategoryBody = body('smallCategory').notEmpty()
const CardBody = body('card').notEmpty()
const CostBody = body('cost').isNumeric().notEmpty()

const Month = param('month')
  .notEmpty()
  .isLength(7)
  .matches(/\d{4}-(0[1-9]|1[012])$/g)

const Year = param('year')
  .notEmpty()
  .isLength(4)
  .matches(/\d{4}$/g)

const Card = param('card')
  .notEmpty()
  .isString()
  .matches(/\b(:?cash|shinhan|samsung|hyundai|woori|lotte|kb)\b/g)

module.exports = {
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
}
