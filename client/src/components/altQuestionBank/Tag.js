import React from 'react'
import { SearchOutlined, Instagram, List, GraphicEq, Lock, StorageOutlined, Settings } from '@material-ui/icons'

export default function Tag({name, category, setQuestionList, icons}) {
    
    const handleTopicChange=()=>
    {
        console.log("theory question...")
       fetch(`https://dragonapp10.herokuapp.com/question/${category}/${name}`)
       .then((res=>res.json()))
       .then(json=>{
           const obj=JSON.parse(json)
           console.log("getting theory question",obj)
           setQuestionList(obj[name])
       })
    }
    return (
        <button onClick={handleTopicChange} className="bg-white hover:bg-pink-300 focus:ring-2 focus:ring-blue-600 focus:text-blue-600  text-gray-800 font-semibold  px-2 m-1 text-xs border border-gray-400 rounded-full shadow">
           {name.length>6?icons[3]:name.length<6?icons[0]:name.length>9?icons[2]:icons[5]} {name}
        </button>
    )
}
