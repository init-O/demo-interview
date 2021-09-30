import React,{useState,useEffect} from 'react'
import Slider from '@material-ui/core/Slider'
import { Slider1} from './styles';
import { ThemeProvider } from '@material-ui/styles';
import { useHistory,useLocation } from 'react-router';
import {addInterviewScore} from '../../action/user/user'
import { NotificationManager } from 'react-notifications';

const InterviewScore = () => {
    const history = useHistory()
    const location = useLocation()
    const intervieweeId = location.state?.userId
    const intervieweeName = location.state?.userName
    const [value,setValue] = useState({first:0,second:0,third:0,fourth:0})
    const [marks,setMarks] = useState({first:0,second:0,third:0,fourth:0})
    const [totalMarks,setTotalMarks] = useState(0)
    console.log(":getting interviewee id ",intervieweeId)

    useEffect(()=>{
        console.log(marks)
        setTotalMarks(marks.first+marks.second+marks.third+marks.fourth)
    },[marks])

    const handleLeave=()=>{
        history.replace('/user/dashboard/')
    }

    const handleSubmitMarks = ()=>{
        console.log(intervieweeId)
        if(!intervieweeId){
            NotificationManager.warning("marks not uploaded","No Interviewee Found")
            history.replace('/user/dashboard/')
        }else{
            addInterviewScore({userId:intervieweeId, score:totalMarks})
            history.replace('/user/dashboard/')
        }
    }

    const sliderMarks = [
        {value:0, label:0},
        {value:1, label:1},
        {value:2, label:2},
        {value:3, label:3},
        {value:4, label:4},
        {value:5, label:5},
        {value:6, label:6},
        {value:7, label:7},
        {value:8, label:8},
        {value:9, label:9},
        {value:10, label:10}
      ];

    return (
        <div className="w-full h-full">
            <div  className="flex justify-center m-3 px-4 py-4 ">
                <div className="border w-full h-full md:w-1/2 md:h-1/2  interviewscore-container">
                    <div className="flex flex-wrap justify-center">
                        <h1 className="text-pink-400 md:text-4xl text-2xl m-2 uppercase">{intervieweeName? `GRADE ${intervieweeName}`.toUpperCase(): 'No Interviewee'}</h1>
                    </div>
                    <div>
                        <div className="w-full md:w-3/4 m-2 px-4 py-4">
                            <h1>How did the little shit perform</h1>
                            <ThemeProvider theme={Slider1}>
                                <Slider
                                    name="slider-1"
                                    aria-label="Custom sliderMarks"
                                    defaultValue={value.first}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    color="secondary"
                                    max={10}
                                    marks={sliderMarks}
                                    onChange={(e,newValue)=>{setMarks({...marks,first:newValue})}}
                                />
                            </ThemeProvider>
                        </div>
                        <div className="w-full md:w-3/4 m-2 px-4 py-4">
                            <h1>How did the little shit perform</h1>
                            <ThemeProvider theme={Slider1}>
                                <Slider
                                    style={{color: '#6ECB63'}}
                                    aria-label="Custom sliderMarks"
                                    defaultValue={value.second}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    color="secondary"
                                    max={10}
                                    marks={sliderMarks}
                                    onChange={(e,newValue)=>{setMarks({...marks,second:newValue})}}
                                />
                            </ThemeProvider>
                        </div>
                        <div className="w-full md:w-3/4 m-2 px-4 py-4">
                            <h1>How did the little shit perform</h1>
                            <ThemeProvider theme={Slider1}>
                                <Slider
                                    style={{color: '#FFBD9B'}}   
                                    aria-label="Custom sliderMarks"
                                    defaultValue={value.third}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    color="secondary"
                                    max={10}
                                    marks={sliderMarks}
                                    onChange={(e,newValue) =>{setMarks({...marks,third:newValue})}}
                                />
                            </ThemeProvider>
                        </div>
                        <div className="w-full md:w-3/4 m-2 px-4 py-4">
                            <h1>How did the little shit perform</h1>
                            <ThemeProvider theme={Slider1}>
                                <Slider
                                    style={{color: '#63B4B8'}}
                                    aria-label="Custom sliderMarks"
                                    defaultValue={value.fourth}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    // color="secondary"
                                    max={10}
                                    marks={sliderMarks}
                                    onChange={(e,newValue)=>{setMarks({...marks,fourth:newValue})}}
                                />
                            </ThemeProvider>
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-blue-400 hover:bg-blue-600 m-2 px-2 py-2 rounded" onClick={handleSubmitMarks}>Submit</button>
                        </div>
                        
                    </div>
                    <h1 className="ml-2 px-2 py-2 text-xl">Total : {totalMarks} / 40</h1>
                    <div className="flex justify-center">
                        <span className="text-sm allign-middle text-gray-300">Not an Interviewer?</span>
                        <button className="ml-2 mb-3 hover:bg-red-500 rounded px-2 text-black bg-red-300" onClick={handleLeave}>Leave</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewScore
