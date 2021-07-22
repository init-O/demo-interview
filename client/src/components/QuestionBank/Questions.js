import React,{useState} from 'react'
import {Grid, Typography, Button} from '@material-ui/core'

const Questions = ({question}) => {
    const [fullView, setFullView] = useState(false) 
    if(fullView){
        return (
            <Grid>
                <Typography variant="h4">Name : {question.name}</Typography>
                <Typography variant="h6">{question.statement}</Typography>
                <Button variant="contained" color="secondary" onClick={()=>setFullView(!fullView)}>Collapse</Button>
            </Grid>
        )
    }else{
        return (
            <Grid>
                <Typography variant="h4">Name : {question.name}</Typography>
                <Button variant="contained" color="primary" onClick={()=>setFullView(!fullView)}>View Full</Button>
            </Grid>
        )
    }
}

export default Questions
