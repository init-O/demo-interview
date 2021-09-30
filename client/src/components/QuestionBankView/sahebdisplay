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


            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {allQuestionPack.map(questionPackName=>{
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
                                    <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
                                </div>
                                </div>
                                <div className="flex items-center">
                                    <img className="w-11 h-11 p-0.5 rounded-full bg-pink-200 mr-4" src="https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png" alt="Avatar of Jonathan Reinink"/>
                                <div className="text-sm text-pink-400">
                                    <p className="text-whiteleading-none">questionPackName.created_by.name.toUppercase()</p>
                                    
                                    <p >{new Date(questionPackName.modified_on).toDateString()}</p>
                                </div>
                                </div>
                                <div className="flex justify-around mt-2">
                                    <button className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={()=>handleOpenQuestionBank(questionPackName._id)} type="button">
                                     Open
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                </div>
        </div>
    )
}

export default Main
