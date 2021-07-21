const mongoose=require('mongoose')
const User=require('./userModel')

const questionSchema=new mongoose.Schema({
    statement: String,
    hint: String,
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Question=mongoose.model('Question', questionSchema)

module.exports=Question