import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import {Grid, TextField, Button} from '@material-ui/core'
import Questions from '../QuestionBank/Questions'
import {getSingleQuestionBank} from '../../action/user/user'

const SingleQuestionBankView = ({questionBankId,setSingleQuestionview, singleQuestionview}) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const [questions,setQuestions] = useState([])

    useEffect(() => {
        const getQuestions = async ()=>{
            const newQuestions = await getSingleQuestionBank(questionBankId)
        
            console.log(newQuestions)
            setQuestions(newQuestions)
        }
        getQuestions()
    },[])
    return (
        <Grid item sm={12} md={12}>
            {questions.map(questionPackName=>{
                return <Questions question={questionPackName}/>
            })}
            <Button variant="contained" color="secondary" onClick={()=>setSingleQuestionview(!singleQuestionview)}>Go Back</Button>
        </Grid>
    )
}

export default SingleQuestionBankView
