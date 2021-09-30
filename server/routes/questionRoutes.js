const express=require('express')
const router=express.Router()

const {getQuestionPacks, getQuestions, postQuestionPack, addQuestion, deleteQuestionPack, editQuestion, getQuestionPack, deleteQuestion, getCoreCSQuestion, getDSAQuestion, getWebDevQuestion} = require('../controllers/questionPackController')

router.get('/questionPacks', getQuestionPacks)

router.get('/questionPack/:packId', getQuestionPack)

router.get('/questions', getQuestions)

router.post('/questionPack', postQuestionPack)

router.delete('/questionPack/:packId', deleteQuestionPack)

router.delete('/questionPack/question/:questionId', deleteQuestion)

router.post('/question/:packId', addQuestion)

router.put('/question/:questionId', editQuestion)

router.get('/question/corecs/:topic', getCoreCSQuestion)

router.get('/question/dsa/:topic', getDSAQuestion)

router.get('/question/webd/:topic', getWebDevQuestion)

module.exports=router