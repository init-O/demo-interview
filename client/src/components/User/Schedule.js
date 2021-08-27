import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import InterviewEntry from './InterviewEntry'
const URL = 'http://localhost:5000'


export default function Schedule({changeDetector}) {
    const user = JSON.parse(localStorage.getItem('profile'))
    const allInterviews= useSelector(state => state.Meetings)
  
    return (
        <div className="">
            <h1 className="text-4xl mt-4 mb-4 font-light" >Scheduled Interviews</h1>
            {allInterviews.map((interview)=>{return <InterviewEntry interview={interview}/>})
            }
        </div>
    )
}
