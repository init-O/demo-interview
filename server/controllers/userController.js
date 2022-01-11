const mongoose=require('mongoose')
const User = require('../models/userModel')

const getUser = async (req, res) => {
    try {
        const email = req.params.email
        const user = await User.findOne({ email: email })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers=async (req, res)=>
{
    const users=await User.find()
    return res.json(users)
}

const loginUser = async (req, res) => {
    try {
        console.log('indise log in')
        const email = req.body.email
        console.log(email)
        const user = await User.findOne({ email: email})
        if (user) {
            res.status(200).json(user)
        } else {

            const newUser = await User.create({
                email: req.body.email,
                name: req.body.name, 
                googleId: req.body.googleId,
                profilePic: req.body.imageUrl
            })
            

            res.status(200).json(newUser);
            const siteInfo=await Site.findOne()
            siteInfo.totalUsers=siteInfo.totalUsers+1
            siteInfo.lastThirtyUsers=siteInfo.lastThirtyUsers+1
        }
    } catch (error) {
        console.log(error)
    }
}

const changeUsername = async (req, res) => {
    try {
        const {email,username} = req.body
        const user = await User.findOne({ username: username})
        if(user){
            res.status(400).json({ message: "User Already Exists"})
        }else{
            const user2 = await User.findOne({email: email})
            user2.username = username
            await user2.save()
            const user4  = await User.findOne({email: email})
            console.log(user4)
            res.status(200).json(user2)
        }
    } catch (error) {
        console.log(error)
    }
}

const searchByName=(req, res)=>
{
    const name=req.body.name
    console.log(name)
    User.find({name: new RegExp(name)}, (err, users)=>
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            console.log(users)
            return res.json(users)
        }
    })
}

const uploadResume = async (req, res) => {
    const {id, resume} = req.body
    try {
        console.log(resume)
        const user = await User.findById(id)
        user.resume =  resume 
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "failed to upload resume"})
    }
}

const addInterviewScore = async (req, res) => {
    try {
        const {userId,score} = req.body
        const scoreObj = {score:score, date:Date.now()}
        const user = await User.findById(userId)
        user.marks.push(scoreObj)
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message:"failed to upldate scores"})
    }
}

const getInterviewScores = async (req, res) => {
    try {
        const {userId,start,end} = req.body
        const startDate = new Date(start).getTime()
        const endDate = new Date(end).getTime()
        const user = await User.findById(userId)
        const scoreList = user.marks
        console.log(userId,startDate,endDate,scoreList)

        var parsedMarks=[]
        scoreList.map(sc=>{
            // const newDate = new Date(sc.date)
            if(sc.date-startDate>=0 && sc.date-endDate<=0){
                const ke = parseInt(new Date(sc.date).toISOString().slice(8, 10))-1
                const obj = {marks:sc.score, date:ke}
                parsedMarks.push(obj)
            }
        })
        console.log(parsedMarks)
        res.status(200).json(parsedMarks);
    } catch (error) {
        res.status(404).json({message:"failed to get Marks"})
    }
}

module.exports = {getUser, loginUser, changeUsername, searchByName, getAllUsers, uploadResume, addInterviewScore, getInterviewScores}