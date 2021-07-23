import React from 'react'
import {Container, Grid, Typography} from '@material-ui/core'

export default function Home() {
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user)
    return (
        <Container>
            <Grid align="center">
                This is Going to be the Home change it with the landing page offcourse.
            </Grid>
        </Container>
    )
}
