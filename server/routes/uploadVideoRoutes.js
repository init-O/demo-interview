const express=require('express')
const router=express.Router()

const {getUploadedVideos, uploadVideo, deleteVideo, getUserVideos} = require('../controllers/uploadVideoController')

router.get('/',getUploadedVideos)

router.post('/',uploadVideo)

router.post('/delete',deleteVideo)

router.get('/userVideos/:id', getUserVideos)

module.exports = router