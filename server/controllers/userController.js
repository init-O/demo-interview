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

const loginUser = async (req, res) => {
    try {
        console.log('indise log in')
        const email = req.params.email
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

module.exports = {getUser, loginUser}