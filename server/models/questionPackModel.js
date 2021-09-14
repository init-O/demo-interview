const mongoose=require('mongoose')
const Question=require('./questionModel')
const User=require('./userModel')

const questionPackSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    modified_on: {
        type: Date,
        default: Date.now
    }


})

const questionPack=mongoose.model('questionPack', questionPackSchema)

module.exports=questionPack
