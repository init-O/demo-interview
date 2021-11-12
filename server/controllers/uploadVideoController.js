const mongoose=require('mongoose')
const UploadedVideo = require('../models/uploadedVideoModel')
const User = require('../models/userModel')

const getUploadedVideos = async (req,res) => {
    try {
        console.log("running")
        const data = await UploadedVideo.find().sort({"uploadDate":-1}).populate("createdBy")
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({message:"No video Found"})
    }
}

const uploadVideo = async (req,res) => {
    try {
        const {name, description, videoHash, createdBy} = req.body;
        console.log(req.body)
        const video = await UploadedVideo.create({
            name:name,
            createdBy:createdBy,
            description:description,
            videoHash:videoHash
        })

        const user = await User.findById(createdBy);
        console.log(user)
        user.uploadedVideos.push(video._id)

        await user.save()
        res.status(200).json(video)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({message:"Cannot upload video"})
    }
}

const deleteVideo = async (req,res) => {
    try {
        const {id, userId} = req.body
        await UploadedVideo.findByIdAndDelete(id)
        const user = await User.findById(userId)
        const userVideos = user.uploadedVideos.filter(videoId=> videoId!=id)
        user.uploadedVideos = userVideos
        await user.save()
        res.status(200).json({message:"Video deleted"})
    } catch (error) {
        console.log(error.message)
        res.status(404).json({message:"Video cannot be deleted"})
    }
}

const getUserVideos = async (req,res) => {
    try {
        const {id} = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user.uploadedVideos) 
    } catch (error) {
        console.log(error.message)
        res.status(404).json({message:"Cannot view user Videos"})
    }
}

module.exports = {getUploadedVideos, uploadVideo, deleteVideo, getUserVideos}