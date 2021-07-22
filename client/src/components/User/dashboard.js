import React, {useState,useEffect} from 'react'
import {Grid, Typography, Button, TextField,Avatar} from '@material-ui/core'
import { useHistory } from 'react-router'
import {useDispatch} from 'react-redux'
import {getQuestionBank} from '../../action/user/user'

const Dashboard = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user)

    const [roomId,setRoomId] = useState('')

    useEffect(() => {
        dispatch(getQuestionBank())
    }, [])

    const handleCreateRoom = (e) => {
        e.preventDefault()
        history.push('/editor')
    }

    const handleJoinRoom = (e) => {
        e.preventDefault()
        history.push(`/room/${roomId}`)
    }

    const handleContribute = (e) => {
        e.preventDefault()
        history.push('/questionBanks')
    }

    return (
        <Grid container >
            <Grid item sm={12} md={3} spacing={3} align="center">
                <img src={user.result.profilePic} alt="" />
                <h6>Yaha pe change profile pic daalne hai jsiko multer use karkle backend mein save karna hai</h6>
                <h2>Name : {user.result.name}</h2>
                <h2>Username : {user.result.userName}</h2>
                <TextField/>
                <Button variant="contained" color="primary">Change Username</Button>
            </Grid>
            <Grid item sm={12} md={9}> 
                <Button variant="outlined" color="primary" onClick={handleCreateRoom}>create Room</Button>
                <TextField onChange={(e)=>setRoomId(e.target.value)}/>
                <Button variant="outlined" color="primary" onClick={handleJoinRoom}>Join Room</Button>
                <Button variant="outlined" color="primary" onClick={handleContribute}>Contribute/View Questionaire</Button>
            </Grid>
        </Grid>
    )
}

export default Dashboard
