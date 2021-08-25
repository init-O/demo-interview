const express = require('express')
const router = express.Router()
const {getUser, loginUser, changeUsername, getAllUsers, searchByName} = require('../controllers/userController')

router.get('/', getUser)

router.post('/login', loginUser)

router.post('/username/change', changeUsername)

router.post('/search', searchByName)

router.get('/getAllUsers', getAllUsers)

module.exports = router