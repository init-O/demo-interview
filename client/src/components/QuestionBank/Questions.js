import React,{useState} from 'react'
import {Grid, Typography, Button} from '@material-ui/core'

const Questions = ({question}) => {
    const [fullView, setFullView] = useState(false) 
    if(fullView){
        return (
            <Grid className="m-3 p-3 content-center">
                <div>
                    <Typography variant="h4">Name : {question.name}</Typography>
                    <Typography variant="h6">{question.statement}</Typography>
                </div>
                <Button variant="contained" color="secondary" onClick={()=>setFullView(!fullView)}>Collapse</Button>
            </Grid>
        )
    }else{
        return (
            <Grid className="flex m-3 p-3 justify-around">
                <Typography className="p-2" variant="h4">Name : {question.name}</Typography>
                <Button variant="contained" color="primary" onClick={()=>setFullView(!fullView)}>View Full</Button>
            </Grid>
        )
    }
}

export default Questions
