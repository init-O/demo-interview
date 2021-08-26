import React, {useState, useEffect} from 'react'

import InterviewEntry from './InterviewEntry'
const URL = 'http://localhost:5000'


export default function Schedule({changeDetector}) {
    const user = JSON.parse(localStorage.getItem('profile'))
    const [interviews, setInterviews]=useState([])

    

    useEffect(()=>
    {
        fetch(`${URL}/user/rooms/${user.result._id}`)
        .then((res)=>res.json())
        .then((json)=>setInterviews(json))
    }, [changeDetector])

    return (
        <div className="">
            <h1 className="text-4xl mt-4 mb-4 font-light" >Scheduled Interviews</h1>
            {
                interviews.map((interview)=>
                (<InterviewEntry interview={interview}/>))
            }
        </div>
    )
}
