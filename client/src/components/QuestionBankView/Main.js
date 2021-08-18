import React,{useState,useEffect} from 'react'
import {Grid, Typography, Button, TextField} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router'

const Main = ({setQuestionBankId,setSingleQuestionview,singleQuestionview}) => {

    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const history = useHistory()
    const questionPack = useSelector((state)=>state.QuestionBank)
    const [allQuestionPack,setAllQuestionPack] = useState(questionPack)
    const [bankName,setBankName] = useState()

    useEffect(() => {
        setAllQuestionPack(questionPack)
    }, [questionPack])

    const handleOpenQuestionBank = (id) => {
        setQuestionBankId(id)
        setSingleQuestionview(!singleQuestionview)
    }

    const handleSearch = () => {
        console.log('searching',bankName)
        const newQuestionPack = questionPack.filter((question)=>question.name===bankName)
        console.log(newQuestionPack)
        setAllQuestionPack(newQuestionPack)
    }

    const handleViewAll = () => {
        setAllQuestionPack(questionPack)
        setBankName('')
    }

    return (
        <div >
            <div className="flex">
                <input type="text" value={bankName} className="form-input mx-4 border-4 border-black" onChange={(e)=>setBankName(e.target.value)}/>
                <button className="mx-2 bg-blue-500 p-2 rounded-full" onClick={handleSearch}>search</button>
                <button className="mx-2 bg-red-500 p-2 rounded-full" onClick={handleViewAll}>View All</button>
            </div>
            {allQuestionPack.map(questionPackName=>{
                    return <Grid>
                        <h1 key={questionPack._id}>{questionPackName.name} : {questionPackName._id}</h1>
                        <Button variant="contained" color="primary" onClick={()=>handleOpenQuestionBank(questionPackName._id)}>Open</Button>
                    </Grid>
                })}
        </div>
    )
}

export default Main
