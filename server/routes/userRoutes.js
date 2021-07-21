const express = require('express')
const router = express.Router()
const {getUser, loginUser} = require('../controllers/userController')

router.get('/', getUser)
router.post('/login', loginUser)

module.exports = router