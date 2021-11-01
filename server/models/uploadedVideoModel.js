const mongoose = require('mongoose')
const User = require('./userModel')

const uploadedVideoSchema = new mongoose.Schema({
    name:String,
    videoHash:String,
    description:String,
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    uploadDate:{
        type:Date,
        default:Date.now()
    }
})

const uploadVideoModel =  mongoose.model('UploadedVideo', uploadedVideoSchema)

module.exports = uploadVideoModel