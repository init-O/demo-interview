const express = require('express')
const router = express.Router()
const {getUser, loginUser, changeUsername} = require('../controllers/userController')

router.get('/', getUser)
router.post('/login', loginUser)
router.post('/username/change', changeUsername)

module.exports = router