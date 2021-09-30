const express = require('express')
const router = express.Router()
const {getUser, loginUser, changeUsername, getAllUsers, searchByName, uploadResume, addInterviewScore, getInterviewScores} = require('../controllers/userController')

router.get('/', getUser)

router.post('/login', loginUser)

router.post('/username/change', changeUsername)

router.post('/search', searchByName)

router.get('/getAllUsers', getAllUsers)

router.post('/uploadResume', uploadResume)

router.post('/addInterviewScore', addInterviewScore)

router.post('/interviewScores', getInterviewScores)

module.exports = router