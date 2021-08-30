import React, {useState,useEffect} from 'react'
import {MenuItem, Select, FormControl, InputLabel, TextField} from '@material-ui/core'
import { useHistory } from 'react-router'
import {useDispatch} from 'react-redux'
import {getQuestionBank, changeUsername, scheduleInterview, getscheduledInterviews} from '../../action/user/user'
import DateTimePicker from 'react-datetime-picker';
import Schedule from './Schedule'
import InviteList from './InviteList'


const Dashboard = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user)
    const [currentUsername,setCurrentUsername] = useState()
    const [roomId,setRoomId] = useState('')
    const roomTypes = ["Coding Round", "Machine Learning", "Viva"]
    const [currentRoomType,setCurrentRoomType] = useState("Coding Round")
    const [dateValue, onChange] = useState(new Date());
    const [changeDetector, setChangeDetector]=useState(false)

    useEffect(() => {
        dispatch(getQuestionBank())
        dispatch(getscheduledInterviews(user.result._id))
    }, [])

    

    const handleCreateRoom = (e) => {
        e.preventDefault()
        switch (currentRoomType) {
            case "Coding Round":
                history.push('/editor')
                break;

            case "Machine Learning":
                history.push('/ml')
                break;
        
            default:
                break;
        }
        
    }

    const handleJoinRoom = (e) => {
        e.preventDefault()
        history.push(`/room/${roomId}`)
    }

    const handleContribute = (e) => {
        e.preventDefault()
        history.push('/questionBanks')
    }

    const handleRoomTypeChange = (e) =>{
        setCurrentRoomType(e.target.value)
    }

    const handleUsernameChage = (e) => {
        if(currentUsername!==user.result.username){
            changeUsername({email:user.result.email, username:currentUsername})
        }
    }

    const handleUploadResume = (e) => {
        //update the resume link to user.resume
    }

    const handleSchedule = (e)=>
    {
        console.log("Schedule should change")
        const interviewData={
            createdBy: user.result._id,
            scheduledDate: dateValue,
            type: currentRoomType
        }
        dispatch(scheduleInterview(interviewData))

    }


    return (
    <div>
       <div className="relative min-h-screen grid grid-cols-1 sm:grid-cols-4  ">
        <div className="bg-blue-500  col-span-1  items-strech">
        <div className="m-3 p-3 flex">
        <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white "src={user.result.profilePic} alt="" /> 
        <div >
        <span className="text-2xl   m-2 font-extrabold ">{user.result.name.split(" ")[0]}</span> <br></br>
        <span className="italic"> @{user.result.username}</span>
        </div>
        </div>
        <div className="m-3">
        <TextField label="username" className="mx-2" onChange={(e)=>setCurrentUsername(e.target.value)}/>
        </div>
        <button  href="#" className="text-white font-bold px-6 py-4 rounded outline-none focus:outline-none ml-6 mr-1 mb-1 bg-yellow-500 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" onClick={handleUsernameChage}>
        Update User Name
        </button>
        <button  href="#" className="text-white font-bold mt-3 px-6 py-4 rounded outline-none focus:outline-none ml-6 mr-1 mb-1 bg-blue-300 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" onClick={handleUploadResume}>
        Upload Resume
        </button>
        </div>

        <div className="p-10 text-2x1 font-bold col-span-3 grid sm:grid-cols-1 md:grid-cols-2">
            <div>
                <p className="text-xl font-semibold">To create an instant interview.</p>
                
                <FormControl>
                    <InputLabel>Room Type</InputLabel>
                    <Select
                    defaultValue={currentRoomType}
                    onChange={handleRoomTypeChange}
                    >
                    {roomTypes.map((theme)=>(
                        <MenuItem value={theme}>{theme}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
    
                <button className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded-full" onClick={handleCreateRoom}>
                Create Room
                </button>
            </div>
            <div>
                <p className="text-xl font-semibold">To join an existing interview.</p>
            <div className="flex  items-center  py-2"> 
            <input className="border-gray-400 border-solid border-2 text-gray-700 mr-3 py-1 px-2" type="text" placeholder="Room Id" aria-label="Id" onChange={(e)=>setRoomId(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleJoinRoom}>
                Join Room
                </button>  
                </div>
                
            </div> 
            <div className="mt-10">
            <p className="text-xl font-semibold">To Schedule an Inteview </p>
                    <div className="mt-4 mb-4">
                        <DateTimePicker
                            onChange={onChange}
                            value={dateValue}
                        />
                    </div>
                    
                    <FormControl>
                    <InputLabel>Room Type</InputLabel>
                    <Select
                    defaultValue={currentRoomType}
                    onChange={handleRoomTypeChange}
                    >
                    {roomTypes.map((theme)=>(
                        <MenuItem value={theme}>{theme}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-full" onClick={handleSchedule}>
                    Schedule Interview
                </button>
            </div>
                
            <div className="mt-10">
                <p className="text-xl font-semibold">To Contribute and view Questions </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded-full" onClick={handleContribute}>
                    Interview Questions
                </button>
            </div>
            
            <Schedule changeDetector={changeDetector}/>
            <InviteList changeDetector={changeDetector} setChangeDetector={setChangeDetector} />


        </div>
        
        </div>

       
        
    
    </div>
    )
}

export default Dashboard
