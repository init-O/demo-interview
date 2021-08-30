const express=require('express')
const router=express.Router()

const {getCurrentStreams, addNewStream, deleteStream} = require('../controllers/streamController')

router.get('/currentStreams', getCurrentStreams  )

router.post('/newStream', addNewStream)

router.delete('/deleteStream/:id', deleteStream)

module.exports = router;