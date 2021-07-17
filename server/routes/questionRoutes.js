const express=require('express')
const router=express.Router()

const {getQuestionPacks, getQuestions, postQuestionPack, addQuestion, deleteQuestionPack, editQuestion, getQuestionPack} = require('../controllers/questionPackController')

router.get('/questionPacks', getQuestionPacks)

router.get('/questionPack/:packId', getQuestionPack)

router.get('/questions', getQuestions)

router.post('/questionPack', postQuestionPack)

router.delete('/questionPack/:packId', deleteQuestionPack)

router.post('/question/:packId', addQuestion)

router.put('/question/:questionId', editQuestion)

module.exports=router