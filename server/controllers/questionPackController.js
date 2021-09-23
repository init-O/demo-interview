const mongoose=require('mongoose')
const questionPack=require('../models/questionPackModel')
const Question=require('../models/questionModel')
const fs=require('fs')
const getQuestionPacks=async (req, res)=>
{
    const questionPacks=await questionPack.find().populate('created_by')
    return res.json(questionPacks)
}

const getQuestionPack=async (req, res)=>
{
    const packId=req.params.packId
    try{
        const result=await questionPack.findById(packId).populate('questions').populate({path:'questions',model:"Question", populate:{path:'created_by', model:'User'} })
        return res.json(result)
    }
    catch (err)
    {
        console.log(err)
        return res.json({message: "Failure"})
    }
}

const postQuestionPack=async (req, res)=>
{
    console.log(req.body)
    const tempQuestionPack=new questionPack({
        name: req.body.name,
        category: req.body.category,
        difficulty: req.body.difficulty,
        created_by: req.body.created_by,
        questions: []
    })
    try{
        const savedQuestionPack=await tempQuestionPack.save()
        console.log(savedQuestionPack)
        return res.json(savedQuestionPack)
    }
    catch (error)
    {
        console.log(error)
    }
    
}

const deleteQuestionPack=async (req, res)=>
{
    const packId=req.params.packId
    try {
        await questionPack.findByIdAndDelete(packId)
        return res.json({message: "Success"})
    }
    catch (error)
    {
        console.log(error)
        return res.json({message: "Error!"})
    }
    
}

const getQuestions=async (req, res)=>
{
    const questions=await Question.find()
    return res.json(questions)
}

const addQuestion=async (req, res)=>
{
    console.log(req.body)
    const packId=req.params.packId
    const tempQuestion=new Question({
        name: req.body.name,
        statement: req.body.statement,
        example:req.body.example,
        // hint: req.body.hint,
        created_by: req.body.created_by
    })
    const savedQuestion=await tempQuestion.save()
    
    questionPack.findById(packId, (err, result)=>
    {
        if (err)
        {
            console.log(err)
            return res.json({message: "Error"})
        }
        result.questions.push(savedQuestion._id)
        result.save()
        return res.json(result)
    })
}

const editQuestion=(req, res)=>
{
    console.log(req.body)
    const questionId=req.params.questionId
    Question.findById(questionId, (err, result)=>
    {
        if (err)
        {
            console.log(err)
            return res.json({message: "Error"})
        }
        else
        {
            result.statement=req.body.statement
            result.hint=req.body.hint
            result.save()
            return res.json(result)
        }
        
    })

}


const deleteQuestion=async (req, res)=>
{
    const packId=req.params.questionId
    try {
        await Question.findByIdAndDelete(packId)
        return res.json({message: "Success"})
    }
    catch (error)
    {
        console.log(error)
        return res.json({message: "Error!"})
    }
    
}

const getCoreCSQuestion=(req, res)=>
{
    fs.readFile('./question_bank/core_cs/'+req.params.topic+'.json', "utf8", (err, jsonString)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message:"error Not found"})
        }
        else
        {
            console.log(jsonString)
            return res.json(jsonString)
        }
    })
}

const getDSAQuestion=(req, res)=>
{
    fs.readFile('./question_bank/dsa/'+req.params.topic+'.json', "utf8", (err, jsonString)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message:"error Not found"})
        }
        else
        {
            console.log(jsonString)
            return res.json(jsonString)
        }
    })
}

const getWebDevQuestion=(req, res)=>
{
    fs.readFile('./question_bank/webd/'+req.params.topic+'.json', "utf8", (err, jsonString)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message:"error Not found"})
        }
        else
        {
            console.log(jsonString)
            return res.json(jsonString)
        }
    })
}


module.exports={getQuestionPacks, getQuestions, postQuestionPack, addQuestion, deleteQuestionPack, editQuestion, getQuestionPack, deleteQuestion, getCoreCSQuestion, getDSAQuestion, getWebDevQuestion}
