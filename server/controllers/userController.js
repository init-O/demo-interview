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

module.exports = {getUser, loginUser, changeUsername, searchByName, getAllUsers}