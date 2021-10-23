const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const board = require('../dbos/board')

// total get board
router.get('/', board.list)

// detail get board
router.get('/:boardId', checkAuth, board.detailList)

// register board
router.post('/save', board.register)

// update board
router.post('/update/:boardId', checkAuth, board.update)

// total delete board
router.post('/delete', board.delete)

// detail delete board
router.post('/delete/:boardId', checkAuth, board.detailDelete)

module.exports = router