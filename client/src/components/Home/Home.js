import React from 'react'
import {Container, Grid, Typography} from '@material-ui/core'

export default function Home() {
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user)
    return (
        <Container>
            <Grid align="center">
                This is Going to be the Home change it with the landing page offcourse. 
                <h1 className="text-2xl	font-black">Tailwind has been successfulyy added .</h1>
            </Grid>

            
        </Container>
    )
}
