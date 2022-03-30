const express = require('express')
const router = express.Router()
const {getUser, loginUser, changeUsername, getAllUsers, searchByName, uploadResume, addInterviewScore, getInterviewScores, customLogin, googleLogin, customSignin} = require('../controllers/userController')

router.get('/', getUser)

router.post('/login', loginUser)

router.post('/customSignup', customLogin)

router.post('/customsignin', customSignin)

router.post('/googleLogin', googleLogin)

router.post('/username/change', changeUsername)

router.post('/search', searchByName)

router.get('/getAllUsers', getAllUsers)

router.post('/uploadResume', uploadResume)

router.post('/addInterviewScore', addInterviewScore)

router.post('/interviewScores', getInterviewScores)

module.exports = router