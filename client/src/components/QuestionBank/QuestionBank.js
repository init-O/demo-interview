import React,{useState} from 'react'
import {Grid, Typography, Button, TextField} from '@material-ui/core'
import {createQuestionBank, deleteQuestionBank} from '../../action/user/user'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router'
import {NotificationManager} from 'react-notifications'

const QuestionBank = ({setLoading}) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const history = useHistory()
    const questionPack = useSelector((state)=>state.QuestionBank)

    const questionBank = {name :'', category:'', difficulty:'Basic', created_by:user?.result._id}
    const [newQuestionBank,setnewQuestionBank] = useState(questionBank)

    const handleCreateQuestionBank = () => {
        if(newQuestionBank.name && newQuestionBank.category && newQuestionBank.difficulty){
            setLoading(true)
            dispatch(createQuestionBank(newQuestionBank,setLoading))
        }else{
            NotificationManager.error('',"Missing Required Fields")
        }
    }

    const handleDeleteQuestionBank = (id) => {
        setLoading(true)
        dispatch(deleteQuestionBank(id,setLoading))
    }

    const handleOpenQuestionBank = (id) => {
        history.push(`/questionBanks/${id}`)
    }

    console.log('question bank',questionPack)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <div className="col-span-1 lg:col-span-2">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {questionPack.map(questionPackName=>{
                    return <div className="col-span-1 lg:col-span-2">
                        <div key={questionPackName._id} className="m-3 w-full">
                            <div className=" QuestionPack-Background border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-2">
                                <div className="text-blue-400 font-bold text-2xl mb-1">{questionPackName.name}</div>
                                <div className="text-yellow-300 font-bold text-lg mb-1">{questionPackName.category}</div>
                                </div>
                                <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                                        {questionPackName.difficulty}
                                    </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                                    {(questionPackName.difficulty==="Basic") &&
                                        <div style={{ width: "20%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
                                    }
                                    {(questionPackName.difficulty==="Easy") &&
                                        <div style={{ width: "40%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
                                    }
                                    {(questionPackName.difficulty==="Medium") &&
                                        <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
                                    }
                                    {(questionPackName.difficulty==="Hard") &&
                                        <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
                                    }
                                    {(questionPackName.difficulty==="Advanced") &&
                                        <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
                                    }
                                </div>
                                </div>
                                <div className="flex items-center">
                                    <img className="w-11 h-11 p-0.5 rounded-full bg-pink-200 mr-4" src={questionPackName.created_by?.profilePic?`${questionPackName.created_by.profilePic}`:user.result.profilePic} alt="Avatar of Jonathan Reinink"/>
                                <div className="text-sm text-pink-400">
                                    <p className="text-whiteleading-none">{questionPackName.created_by?.name?`${questionPackName.created_by.name}`.toUpperCase():`${user.result.name}`.toUpperCase()}</p>
                                    
                                    <p >{new Date(questionPackName.modified_on).toDateString()}</p>
                                </div>
                                </div>
                                <div className="flex justify-around mt-2">
                                    <button className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>handleOpenQuestionBank(questionPackName._id)} type="button">
                                     Open
                                    </button>
                                    {(user.result._id === questionPackName.created_by._id) && <button className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>handleDeleteQuestionBank(questionPackName._id)} type="button">
                                     Delete
                                    </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                </div>
            </div>
            <div className="col-span-1">
            <div className="flex flex-wrap m-2 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-module-name">
                    Name
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-module-name" type="text" placeholder="Name of the Module" onChange={(e)=>setnewQuestionBank({...newQuestionBank,name:e.target.value})} required/>
                <p className="text-gray-400 text-xs italic">Better be a good module</p>
                </div>
            </div>
            <div className="flex flex-wrap m-2 mb-6 content-evenly">
                <div className="w-half px-3">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-category">
                    Type
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-category" type="text" placeholder="Module Category" onChange={(e)=>setnewQuestionBank({...newQuestionBank,category:e.target.value})} required/>
                </div>
                <div className="w-half px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-module-difficulty">
                        Difficulty
                    </label>
                    <div className="relative" >
                        <select className="w-full block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-module-difficulty" onChange={(e)=>setnewQuestionBank({...newQuestionBank,difficulty: e.target.value})}>
                            <option>Basic</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                            <option>Advanced</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-wrap m-2 mb-6 ">  
                <button className="py-3 px-4 w-full uppercase font-bold mb-3 m-2 bg-blue-300 hover:bg-blue-500 rounded text-black" onClick={handleCreateQuestionBank}>Create New question Bank</button>
            </div>
            </div>
        </div>
    )
}

export default QuestionBank
