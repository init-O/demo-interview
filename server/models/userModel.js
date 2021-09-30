const mongoose=require('mongoose')
const Schema=mongoose.Schema
const faker=require('faker')

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