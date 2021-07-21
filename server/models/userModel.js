const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name: String,
    username: String,
    age: Number,
    email: String,
    isAdmin: {
        type: Boolean,
        default: true
    },
    profilePic:{
        type:String,
    },
    googleId: String
})

const User=mongoose.model('User', userSchema)
module.exports=User