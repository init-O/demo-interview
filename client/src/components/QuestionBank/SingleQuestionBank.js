import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import {getSingleQuestionBank, addQuestionToBank} from '../../action/user/user'
import {Grid, TextField, Button} from '@material-ui/core'
import Questions from './Questions'
import { NotificationManager } from 'react-notifications'

const SingleQuestionBank = ({setLoading}) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const {id} = useParams()
    const dispatch = useDispatch()
    const [questions,setQuestions] = useState([])
    const [addQuestion,setAddQuestion] = useState({name:'', statement:'', created_by:user.result._id})

    useEffect(() => {
        const getQuestions = async ()=>{
            setLoading(true)
            const newQuestions = await getSingleQuestionBank(id)
            setLoading(false)
            console.log(newQuestions)
            setQuestions(newQuestions)
        }
        getQuestions()
    },[])

    const handleCreateQuestion = () => {
        if(addQuestion.name && addQuestion.statement){
            setLoading(true)
            setQuestions([...questions,addQuestion])
    
            addQuestionToBank(id,addQuestion,setLoading)
            setAddQuestion({name:'', statement:'', created_by:user.result._id})
        }else{
            NotificationManager.error('Name and statement',"Missing Required Fields")
        }
    }

    return (
        <Grid container >
            <Grid item sm={12} md={8}>
                {questions.map(questionPackName=>{
                    return <Questions question={questionPackName}/>
                })}
            </Grid>
            <Grid item sm={12} md={4}>
                <TextField label="Name" onChange={(e)=>setAddQuestion({...addQuestion,name:e.target.value})}/>
                <TextField label="statement" onChange={(e)=>setAddQuestion({...addQuestion,statement:e.target.value})}/>
                <Button  variant="contained" color="primary" onClick={handleCreateQuestion}>Add question</Button>
            </Grid>
        </Grid>
    )
}

export default SingleQuestionBank
