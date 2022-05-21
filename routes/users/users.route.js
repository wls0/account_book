const express = require('express')
const router = express.Router()
const { CheckUserId, CreateUser } = require('./users.service')

router.get('/:id', CheckUserId)
router.post('/signup', CreateUser)

module.exports = router
