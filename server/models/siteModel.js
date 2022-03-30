const mongoose=require('mongoose')
const Schema=mongoose.Schema

const siteSchema=new Schema({
    totalViews: {
        type: Number,
        default: 0
    },
    lastThirtyViews: {
        type: Number,
        default: 0
    },
    totalUsers: {
        type: Number,
        default: 0
    },
    lastThirtyUsers: {
        type: Number, 
        default: 0
    }
})

const Site=mongoose.model('Site', siteSchema)

module.exports=Site