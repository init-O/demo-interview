import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import InterviewEntry from './InterviewEntry'
import {config} from '../../data/Config'

const URL = config.url

export default function Schedule({changeDetector,setLoading}) {
    const user = JSON.parse(localStorage.getItem('profile'))
    const allInterviews= useSelector(state => state.Meetings)
  
    return (
        <div className="">
            <h1 className="text-4xl mt-4 mb-4 font-light dashboard-headings" >Scheduled Interviews</h1>
            {allInterviews.map((interview)=>{return <InterviewEntry interview={interview} setLoading={setLoading}/>})
            }
        </div>
    )
}
