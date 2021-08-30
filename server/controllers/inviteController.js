const mongoose=require('mongoose')
const Room=require('../models/roomModel')
const Invite=require('../models/inviteModel')

const createActiveRoom=async (req, res)=>
{
    
    const existingRoom=await Room.find({roomId: req.body.roomId.id})
    if (!existingRoom)
    {
        const newRoom=new Room({
            createdBy: req.body.createdBy,
            roomId: req.body.roomId.id
        })
    
        await newRoom.save((err, savedRoom)=>
        {
            if (err)
            {
                console.log(err)
                return res.status(400).json({message: "Error"})
            }
            else 
            {
                return res.json(savedRoom)
            }
        })
    }
    
}

const createScheduledRoom=(req, res)=>
{
    console.log('New Scheduled Room is being created')
    console.log(req.body)
    const newRoom=new Room({
        createdBy: req.body.createdBy,
        active: false,
        scheduled: true,
        scheduledDate: req.body.scheduledDate,
        type: req.body.type
    })
    
    newRoom.save((err, savedRoom)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(400).json({message: "Error"})
        }
        else 
        {
            Room.findById(savedRoom._id).populate('createdBy invitedUser').exec((err, rooms)=>
            {
                if (err)
                {
                    console.log(err)
                    return res.status(404).json({message: "Error"})
                }
                else
                {
                    return res.json(rooms)
                }
            })
        }
    })
}

const getRoom=(req, res)=>
{
    const roomId=req.params.id
    Room.findById(roomId, (err, room)=>
    {
        if (err)
        {   
            console.log(err)
            return res.status(404).json({message: "Error"})
        }
        else
        {
            return res.json(room)
        }
    })
}

const getAllRooms=async (req, res)=>
{
    const roomsList=await Room.find()
    return res.json(roomsList)
}

const getUserRooms=async (req, res)=>
{
    const userId=req.params.userId
    Room.find({$or: [
        {createdBy: userId},
        {invitedUser: userId}
    ]}).populate('createdBy invitedUser').exec((err, rooms)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message: "Error"})
        }
        else
        {
            return res.json(rooms)
        }
    })
    /*
    Room.find({$or: [
        {createdBy: userId},
        {invitedUser: userId}
    ]}, (err, rooms)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message: "Error"})
        }
        else
        {
            return res.json(rooms)
        }
    }) */
}

const deleteRoom=(req, res)=>
{
    const roomId=req.params.id
    console.log('inside the deleteting room', roomId)
    Room.findOneAndDelete(roomId, (err, deletedRoom)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message: "Error"})
        }
        else
        {
            return res.json(deletedRoom)
        }
    })
}

const createInvite=async (req, res)=>
{
    const roomId=req.params.roomId
    console.log(req.body)
    const room=await Room.findById(roomId)
    const newInvite=new Invite({
        sentBy: req.body.sentBy,
        sentTo: req.body.sentTo,
        roomId: room._id,
        scheduledDate: room.scheduledDate
        
    })

    const savedInvite=await newInvite.save()
}

const getUserInvites=(req, res)=>
{
    console.log("The path was hit")
    /*
    const userId=req.params.userId
    console.log(userId)
    Invite.find({sentTo: userId}, (err, invites)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message: "Error"})
        }
        else
        {
            return res.json(invites)
        }
    }) */
}

const getInvites=async (req, res)=>
{
    const invites=await Invite.find()
    return res.json(invites)
}

const getInvitesById= (req, res)=>
{
    console.log(req.params.userId)
    Invite.find({sentTo: req.params.userId}).populate('sentTo sentBy').exec((err, invites)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message: "Error"})
        }
        else
        {
            return res.json(invites)
        }
    })
    /*
    Invite.find({sentTo: req.params.userId}, (err, invites)=>
    {
        if (err)
        {
            console.log(err)
            return res.status(404).json({message: "Error"})
        }
        else
        {
            return res.json(invites)
        }
    }) */ 
}

const clearAll=async (req, res)=>
{
    await Room.deleteMany()
    await Invite.deleteMany()
}

const acceptInvite=async (req, res)=>
{
    console.log('Accepted')
    const inviteId=req.params.id
    var currRoom
    var currUser
    await Invite.findById(inviteId, (err, invite)=>
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            invite.accepted=true
            currRoom=invite.roomId
            currUser=invite.sentTo
            invite.save()
            return res.json(invite)
        }
    })

    await Room.findById(currRoom, (err, room)=>
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            room.invitedUser=currUser
            room.accepted=true
            room.save()
        }
    })
}

const deleteInvite=(req, res)=>
{
    const inviteId=req.params.id
    Invite.findByIdAndDelete(inviteId, (err, deletedInvite)=>
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            return res.json(deletedInvite)
        }
    })
}

module.exports={createActiveRoom, createScheduledRoom, createInvite, getRoom, getAllRooms, getInvitesById, getUserRooms, getInvites, getUserInvites, acceptInvite, deleteRoom, deleteInvite, clearAll}