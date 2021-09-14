const Stream = require('../models/streamModel')
const mongoose=require('mongoose')

const getCurrentStreams = async (req, res) => {
    try {
        const streams = await Stream.find().populate('created_by')
        res.status(200).json(streams)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

const addNewStream = async (req, res) => {
    try {
        const {streamId, type, name} = req.body
        const newStream = await Stream.create({
            streamId: streamId,
            type: type,
            name: name,
            created_by: req.body.created_by
        })
        const stream = await Stream.findById(newStream).populate('created_by')
        res.status(200).send(stream)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

const deleteStream = async (req, res) => {
    try {
        console.log('deleting stream',req.params)
        const streamId = req.params.id
        Stream.findOneAndDelete({streamId},(err,deleteStream) => {
            if(err){
                console.log(err.message)
                res.status(500).json({message: "Error"})
            }else{
                return res.status(200).json(deleteStream)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

module.exports = {getCurrentStreams, addNewStream, deleteStream}