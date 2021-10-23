const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const user = require('../dbos/user')

// 관리자 total get user
router.get('/', user.list)

// 일반 유저 get user
router.get('/:userId', checkAuth, user.detailList)

// signup
router.post('/signup', user.signup)

// login
router.post('/login', user.login)

// update 
router.post('/update/:userId', checkAuth, user.update)

// 관리자 total delete user
router.post('/delete', user.delete)

// 일반 유저 delete user
router.post('/delete/:userId', checkAuth, user.detailDelete)

module.exports = router