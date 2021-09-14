const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    streamId: String,
    type: String,
    name: String
})

const streamModel = mongoose.model('Stream', streamSchema)

module.exports = streamModel