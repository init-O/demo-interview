const express=require('express')
const router=express.Router();

const {createActiveRoom, createScheduledRoom, createInvite, getRoom, getAllRooms, getUserRooms, getUserInvites, clearAll, getInvitesById, getInvites, acceptInvite, deleteRoom, deleteInvite}=require('../controllers/inviteController')

router.post('/activeRoom', createActiveRoom)

router.post('/scheduledRoom', createScheduledRoom)

router.get('/room/:id', getRoom)

router.get('/rooms', getAllRooms)

router.get('/user/rooms/:userId', getUserRooms)

router.delete('/room/:id', deleteRoom)

router.post('/invite/:roomId', createInvite)

router.get('/invites/:userId', getInvitesById)

router.get('/invites', getInvites)

router.put('/invite/:id', acceptInvite)

router.delete('/invite/:id', deleteInvite)

router.get('/clearall', clearAll)

module.exports=router
