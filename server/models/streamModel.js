const mongoose = require('mongoose');
const User =require('./userModel')
const streamSchema = new mongoose.Schema({
    streamId: String,
    type: String,
    name: String,
    created_by:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    modified_on: {
        type: Date,
        default: Date.now
    }
})

const streamModel = mongoose.model('Stream', streamSchema)

module.exports = streamModel