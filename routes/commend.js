const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const commend = require('../dbos/commend')

// get commend
router.get('/:commendId', checkAuth, commend.list)

// register commend
router.post('/save', checkAuth, commend.register)

// update commend
router.post('/update/:commendId', checkAuth, commend.update)

// delete commend
router.post('/delete/:commendId', checkAuth, commend.delete)

module.exports = router