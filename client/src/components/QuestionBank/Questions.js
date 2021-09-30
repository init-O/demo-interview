import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {Grid, Typography, Button} from '@material-ui/core'
import {deleteQuestion} from '../../action/user/user'

const Questions = ({question, setLoading, getQuestions}) => {
    const [fullView, setFullView] = useState(false) 
    const dispatch =  useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const handleDeleteQuestion = (id) =>{
        console.log('delete question ', id)
        dispatch(deleteQuestion(id,setLoading, getQuestions));
    }

    if(fullView){
        return (
                <div className=" Question-Background border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal rounded">
                    <div className="mb-4">
                    <div className="text-blue-400 font-bold text-3xl mb-2">{question.name}</div>
                    <h2 className="text-white uppercase text-xl mb-2">Statement</h2>
                    <p class="text-yellow-400 text-lg text-base mb-2">{question.statement}</p>
                    <h2 className="text-white uppercase text-xl mb-2">Example</h2>
                    <p class="text-yellow-400 text-lg text-base mb-2">{question.example}</p>

                    </div>
                    <div className="flex items-center">
                        <img className="w-11 h-11 p-0.5 rounded-full bg-pink-200 mr-4" src={question.created_by?.profilePic?`${question.created_by.profilePic}`:user.result.profilePic} alt="Avatar of Jonathan Reinink"/>
                    <div className="text-sm text-pink-400">
                        <p className="text-whiteleading-none">{question.created_by?.name?`${question.created_by.name}`.toUpperCase():`${user.result.name}`.toUpperCase()}</p>
                        
                        <p >{new Date(question.modified_on).toDateString()}</p>
                    </div>
                    </div>
                    <div className="flex justify-around mt-2">
                        <button className="bg-yellow-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>setFullView(!fullView)} type="button">
                            Collapse
                        </button>
                        {(user.result._id === question.created_by._id) && <button className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>{handleDeleteQuestion(question._id)}} type="button">
                            Delete
                        </button>}
                    </div>
                </div>
        )
    }else{
        return (
            // <Grid className="flex m-3 p-3 justify-around">
            // </Grid>
            <div className="flex-none">

                <div className=" Question-Background border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal rounded">
                    <div className="mb-4">
                    <div className="text-blue-400 font-bold text-2xl mb-1">{question.name}</div>
                    <p class="text-yellow-300 text-base">{`${question.statement}`.slice(0,120)}....</p>
                    </div>
                    <div className="flex items-center">
                        <img className="w-11 h-11 p-0.5 rounded-full bg-pink-200 mr-4" src={question.created_by?.profilePic?`${question.created_by.profilePic}`:user.result.profilePic} alt="Avatar of Jonathan Reinink"/>
                    <div className="text-sm text-pink-400">
                        <p className="text-whiteleading-none">{question.created_by?.name?`${question.created_by.name}`.toUpperCase():`${user.result.name}`.toUpperCase()}</p>
                        
                        <p >{new Date(question.modified_on).toDateString()}</p>
                    </div>
                    </div>
                    <div className="flex justify-around mt-2">
                        <button className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>setFullView(!fullView)} type="button">
                            View Full
                        </button>
                        {(user.result._id === question.created_by._id) && <button className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>{handleDeleteQuestion(question._id)}} type="button">
                            Delete
                        </button>}
                    </div>
                </div>
            </div>

        )
    }
}

export default Questions
