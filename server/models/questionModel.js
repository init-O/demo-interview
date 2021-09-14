const mongoose=require('mongoose')
const User=require('./userModel')

const questionSchema=new mongoose.Schema({
    name:String,
    statement: String,
    example:String,
    hint: String,
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    modified_on: {
        type: Date,
        default: Date.now
    }
})

const Question=mongoose.model('Question', questionSchema)

module.exports=Question