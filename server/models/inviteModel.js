const mongoose=require('mongoose')
const Schema=mongoose.Schema


const inviteSchema=new Schema({
    sentBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sentTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    accepted: {
        type: Boolean,
        default: false
    },
    scheduledDate:  {
        type: Date,
        default: Date.now
    }
})


const Invite=mongoose.model('Invite', inviteSchema)
module.exports=Invite