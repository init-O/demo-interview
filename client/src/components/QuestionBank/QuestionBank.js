import React,{useState} from 'react'
import {Grid, Typography, Button, TextField} from '@material-ui/core'
import {createQuestionBank, deleteQuestionBank} from '../../action/user/user'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router'

const QuestionBank = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const history = useHistory()
    const questionPack = useSelector((state)=>state.QuestionBank)

    const questionBank = {name :'', category:'', difficulty:0, created_by:user?.result._id}
    const [newQUestionBank,setNewQuestionBank] = useState(questionBank)

    const handleCreateQuestionBank = () => {
        dispatch(createQuestionBank(newQUestionBank))
    }

    const handleDeleteQuestionBank = (id) => {
        dispatch(deleteQuestionBank(id))
    }

    const handleOpenQuestionBank = (id) => {
        history.push(`/questionBanks/${id}`)
    }

    console.log('question bank',questionPack)

    return (
        <Grid container>
            <Grid item sm={12} md={8}>
                {questionPack.map(questionPackName=>{
                    return <Grid>
                        <h1 key={questionPack._id}>{questionPackName.name} : {questionPackName._id}</h1>
                        <Button variant="contained" color="primary" onClick={()=>handleOpenQuestionBank(questionPackName._id)}>Open</Button>
                        <Button variant="contained" color="secondary" onClick={()=>handleDeleteQuestionBank(questionPackName._id)}>Delete</Button>
                    </Grid>
                })}
            </Grid>
            <Grid item sm={12} md={4}>
                <TextField label="Name" onChange={(e)=>setNewQuestionBank({...newQUestionBank,name:e.target.value})}/>
                <TextField label="Category" onChange={(e)=>setNewQuestionBank({...newQUestionBank,category:e.target.value})}/>
                <TextField label="Difficulty" onChange={(e)=>setNewQuestionBank({...newQUestionBank,difficulty:e.target.value})}/>
                <Button  variant="contained" color="primary" onClick={handleCreateQuestionBank}>Create New question Bank</Button>
            </Grid>
        </Grid>
    )
}

export default QuestionBank
