const express=require('express')
const router=express.Router()

const {getSiteInfo, postHit} = require('../controllers/siteController')

router.get('/siteinfo', getSiteInfo)

router.post('/hit', postHit)


module.exports=router
