const mongoose = require('mongoose');

const codeSchema=new mongoose.Schema({
    _id: String,
    data: String
})

const Code=mongoose.model('Code', codeSchema)

module.exports = Code