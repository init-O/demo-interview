const mongoose=require('mongoose')
const Schema=mongoose.Schema
const {v4}=require('uuid')

const getCurrentDate=()=>{
    const newDate=new Date()
    return newDate
}

const roomSchema=new Schema({
    roomId: {
        type: String,
        default: ()=>v4()
    },
    type: {
        type: String,
        default: "Coding Round"
    },
    active: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: ()=>getCurrentDate()
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    joinedCount: {
        type: Number,
        default: 0
    },
    full: {
        type: Boolean,
        default: false
    },
    scheduled:
    {
        type: Boolean,
        default: false
    },
    scheduledDate: {
        type: Date,
        default: getCurrentDate()
    },
    accepted: {
        type: Boolean,
        default: false
    },
    invitedUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


const Room=mongoose.model('Room', roomSchema)
module.exports=Room