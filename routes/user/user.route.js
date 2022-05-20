const express = require('express')
const router = express.Router()
const { CheckUserId, CreateUser } = require('./user.service')

router.get('/:id', CheckUserId)
router.post('/signup', CreateUser)

module.exports = router
