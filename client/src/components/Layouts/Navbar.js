import React from 'react'
import {Grid,Button, Typography} from '@material-ui/core'
import CreateRoomIcon from '@material-ui/icons/RoomOutlined'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'


const Navbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleLogin = () =>{
        history.push('/signIn')
    }

    const handleLogout = () =>{
        dispatch({type:"LOGOUT"})
        history.push('/')
    }

    return (
       <Grid container align="center">
           <Grid>
                <Typography variant="h6">Demo-Interview</Typography>
           </Grid>
           <Grid item xs={12} md={4}>
                {user ? <Button variant="outlined" color="secondary" onClick={handleLogout}>Logout</Button>
                 : <Button variant="outlined" color="primary" onClick={handleLogin}>Login</Button>}
           </Grid>
       </Grid>
    )
}

export default Navbar
