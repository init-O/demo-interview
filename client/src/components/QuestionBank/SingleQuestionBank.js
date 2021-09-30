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
    const [deletedQuestion,setDeletedQuestion] = useState(false)
    const [addQuestion,setAddQuestion] = useState({name:'', statement:'',example:'', created_by:user.result._id})

    const getQuestions = async ()=>{
        console.log("runninh again")
        const newQuestions = await getSingleQuestionBank(id,setLoading)
        console.log(newQuestions)
        setQuestions(newQuestions)
    }
    useEffect(()=>{
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4" >
            <div className="col-span-1 xl:col-span-3">
            <div className="grid grid-cols-1 px-4 py-2 lg:grid-cols-2 gap-6">
                {questions.map(questionPackName=>{
                    return <Questions question={questionPackName} getQuestions={getQuestions} setLoading={setLoading}/>
                })}
            </div>
            </div>
            <div className="col-span-1">
                <div className="flex flex-wrap m-2">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-red-300 text-sm font-bold mb-2" for="grid-question-name">
                        Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-question-name" type="text" placeholder="Name"  onChange={(e)=>setAddQuestion({...addQuestion,name:e.target.value})} required/>
                    <p className="text-gray-400 text-xs italic">Better be a good Question</p>
                    </div>
                </div>
                <div className="flex flex-wrap m-2">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-red-300 text-sm font-bold mb-2" for="grid-question-statement">
                        Problem Statement
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" rows="10" id="grid-question-statement" type="text" placeholder="Question"  onChange={(e)=>setAddQuestion({...addQuestion,statement:e.target.value})} required/>
                    </div>
                </div>
                <div className="flex flex-wrap m-2">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-red-300 text-sm font-bold mb-2" for="grid-question-statement">
                        Example
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" rows="10" id="grid-question-statement" type="text" placeholder="Example"  onChange={(e)=>setAddQuestion({...addQuestion,example:e.target.value})} required/>
                    </div>
                </div>
                <div className="flex flex-wrap m-2 mb-6 ">  
                    <button className="py-3 px-4 w-full uppercase font-bold mb-3 m-2 bg-indigo-400 hover:bg-indigo-700 rounded text-black" onClick={handleCreateQuestion}>Add Question</button>
                </div>
            </div>
        </div>
    )
}

export default SingleQuestionBank
