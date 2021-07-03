import React from 'react'
import {Grid,Button} from '@material-ui/core'
import CreateRoomIcon from '@material-ui/icons/RoomOutlined'
import { useHistory } from 'react-router'


const Navbar = () => {
    const history = useHistory()
    const handleCreateRoom = () =>{
        history.push('/editor')
    }

    return (
       <Grid container align="center">
           <Grid item xs={12} md={4}>
               <Button variant="outlined" color="primary" onClick={handleCreateRoom}>Create Room</Button>
           </Grid>
           <Grid item xs={12} md={4}>
                <Button variant="outlined" color="primary">Join Room</Button>
           </Grid>
           <Grid item xs={12} md={4}>
                <Button variant="outlined" color="primary">Room</Button>
           </Grid>
       </Grid>
    )
}

export default Navbar
