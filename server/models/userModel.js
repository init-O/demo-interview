const mongoose=require('mongoose')
const Schema=mongoose.Schema
const faker=require('faker')
const UploadedVideo = require('./uploadedVideoModel')
const getNewUserName = () => {
    return faker.internet.userName()
}

const userSchema=new Schema({
    name: String,
    username:{
        type:String,
        default:()=>getNewUserName()
    },
    age: Number,
    email: String,
    uploadedVideos:[{type: mongoose.Schema.Types.ObjectId, ref: 'UploadedVideo'}],
    isAdmin: {
        type: Boolean,
        default: true
    },
    profilePic:{
        type:String,
    },
    googleId: String,
    resume:{
        type:String
    },
    marks:[Object]
})

const User=mongoose.model('User', userSchema)
module.exports=User