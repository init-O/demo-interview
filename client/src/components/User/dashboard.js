import React, {useState,useEffect} from 'react'
import {MenuItem, Select, FormControl, InputLabel, TextField} from '@material-ui/core'
import { useHistory } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {getQuestionBank, changeUsername, scheduleInterview, getscheduledInterviews, uploadResume, uploadNewVideo} from '../../action/user/user'
import {getAuthData} from '../../action/auth/auth'
import DateTimePicker from 'react-datetime-picker';
import Schedule from './Schedule'
import InviteList from './InviteList'
import { NotificationManager } from 'react-notifications'
import MarksGraph from './MarksGraph'

const {create} = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


const Dashboard = ({setLoading}) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const userPres = useSelector(state=>state.User.authData)
    console.log("ayth user", userPres)
    const [currentUsername,setCurrentUsername] = useState()
    const [roomId,setRoomId] = useState('')
    const roomTypes = ["Coding Round", "Machine Learning", "Viva", "Frontend"]
    const [currentRoomType,setCurrentRoomType] = useState("Coding Round")
    const [dateValue, onChange] = useState(new Date());
    const [changeDetector, setChangeDetector]=useState(false)
    const [resumeHash, setResumeHash] = useState()
    const [resumeLoaded,setResumeLoaded] = useState(false)
    const [videoHash, setVideoHash] = useState()
    const [videoLoaded,setVideoLoaded] = useState(false)

    const [videoName,setVideoName] = useState('')
    const [videoDescription,setVideoDescription] = useState('')

    useEffect(() => {
        if(!user){
            NotificationManager.error("login To continue using")
            history.replace('/')
        }
        else{
            dispatch(getQuestionBank())
            dispatch(getscheduledInterviews(user.result._id))
        }
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
        
            case "Viva":
                history.push('/viva')
                break;
            case "Frontend":
                history.push('/frontend')
                break;
        
            default:
                break;
        }
        
    }

    const handleJoinRoom = (e) => {
        e.preventDefault()
        if(roomId){
            history.push(`/room/${roomId}`)
        }else{
            NotificationManager.warning("","Enter the room Id")
        }
    }

    const handleContribute = (e) => {
        e.preventDefault()
        history.push('/questionBanks')
    }

    const handleRoomTypeChange = (e) =>{
        setCurrentRoomType(e.target.value)
    }

    const handleUsernameChage = (e) => {
        if(!currentUsername){
            NotificationManager.error("","Invalid username")
        }else if(currentUsername!==user?.result.username){
            setLoading(true)
            changeUsername({email:user.result.email, username:currentUsername},setLoading)
            dispatch(getAuthData(user))
        }
    }

    const handleCaptureResume = (e)=>{
        NotificationManager.warning("","Loading Resume", 3000)
        setResumeLoaded(false)
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend =async ()=>{
            const buffer = new Buffer(reader.result)
            const result =await ipfs.add(buffer)
            setResumeHash(result.path)
            setResumeLoaded(true)
        }
    
    }

    const handleUploadResume = (e) => {
        //update the resume link to user.resume
        setLoading(true)
        setResumeLoaded(false)
        NotificationManager.info("","Uploading ")
        e.preventDefault()
        const sendData = {id:user?.result._id,resume:`https://ipfs.infura.io/ipfs/${resumeHash}`}
        uploadResume(sendData,setLoading)
        
    }

    const handleCaptureVideo = (e)=>{
        NotificationManager.warning("","Loading Resume", 3000)
        setVideoLoaded(false)
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend =async ()=>{
            const buffer = new Buffer(reader.result)
            const result =await ipfs.add(buffer)
            setVideoHash(result.path)
            setVideoLoaded(true)
        }
    
    }

    const handleUploadVideo = (e) => {
        //update the resume link to user.resume
        setLoading(true)
        setVideoLoaded(false)
        NotificationManager.info("","Uploading ")
        e.preventDefault()
        const sendData = {createdBy:user?.result._id,videoHash:`https://ipfs.infura.io/ipfs/${videoHash}`,name:videoName,description:videoDescription}
        uploadNewVideo(sendData,setLoading)
        
    }

    const handleSchedule = (e)=>
    {   setLoading(true)
        console.log("Schedule should change")
        const interviewData={
            createdBy: user?.result._id,
            scheduledDate: dateValue,
            type: currentRoomType
        }
        dispatch(scheduleInterview(interviewData,setLoading))

    }


    return (
    <div>
       <div className="relative min-h-screen grid grid-cols-1 sm:grid-cols-4  ">
        <div className="col-span-1  items-strech">
        <div className="m-3 p-3 flex">
        <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white "src={user?.result.profilePic} alt="" /> 
        <div >
        <span className="text-2xl uppercase  m-2 font-extrabold dashboard-headings">{user?.result.name.split(" ")[0]}</span> <br></br>
        <span className="italic text-black"> @{userPres?.result.username}</span>
        </div>
        </div>
        <div className="m-3">

        <div className="flex flex-wrap m-1 mb-6 content-evenly">
            <div className="w-half px-3">
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" onChange={(e)=>setCurrentUsername(e.target.value)} placeholder="Username"/>
            </div>
            <div className="w-half px-3">
            <button className="text-white w-full font-bold px-4 py-3 rounded outline-none focus:outline-none mb-1 bg-yellow-500 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" onClick={handleUsernameChage}>
            Update User Name
            </button>  
            </div>
        </div>


        <div className="flex flex-wrap m-1 mb-6 content-evenly">
            <div className="w-half px-3 overflow-hidden">
                <input type="file" accept="image/*,.pdf" className="mb-2 w-full " onChange={handleCaptureResume}/>
            </div>
            <div className="w-half px-3">
                { resumeLoaded ? 
                <button   className="text-white mt-2 font-bold px-4 py-2 rounded outline-none focus:outline-none mb-1 bg-blue-300 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" onClick={handleUploadResume}>
                    Upload Resume
                </button>:
                <button   className="text-white mt-2 font-bold px-4 py-2 rounded outline-none  mb-1 bg-gray-500  uppercase text-sm h transition-all duration-150 disabled" >
                    Upload Resume
                </button>
                }
            </div>
        </div>
        <div className="flex flex-wrap m-1 mb-6 content-evenly">
            <div className="w-half px-3 overflow-hidden">
                <input type="file" accept=".mp4,.mov,wmv,.flv" className="mb-2 w-full " onChange={handleCaptureVideo}/>
            </div>
            <div className="w-half px-3 overflow-hidden">
                <input placeholder="name" type="text"  className="mb-2 w-full " onChange={(e)=>setVideoName(e.target.value)}/>
            </div>
            <div className="w-half px-3 overflow-hidden">
                <input placeholder="description"  type="text" className="mb-2 w-full " onChange={(e)=>setVideoDescription(e.target.value)}/>
            </div>
            <div className="w-half px-3">
                { videoLoaded ? 
                <button   className="text-white mt-2 font-bold px-4 py-2 rounded outline-none focus:outline-none mb-1 bg-blue-300 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" onClick={handleUploadVideo}>
                    Upload video
                </button>:
                <button   className="text-white mt-2 font-bold px-4 py-2 rounded outline-none  mb-1 bg-gray-500  uppercase text-sm h transition-all duration-150 disabled" >
                    Upload Video
                </button>
                }
            </div>
        </div>



        </div>
        
        </div>

        <div className="p-10 text-2x1 font-bold col-span-3 grid sm:grid-cols-1 md:grid-cols-2">
            <div>
                <p className="text-xl font-semibold dashboard-headings">To create an instant interview.</p>
                
                <FormControl>

                    <div className="relative" >
                        <select onChange={handleRoomTypeChange} className="w-full block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 mt-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-module-difficulty" >
                        {roomTypes.map((theme)=>(
                            <option value={theme}>{theme}</option>
                        ))}
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </FormControl>
    
                <button className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded-full" onClick={handleCreateRoom}>
                Create Room
                </button>
            </div>
            <div>
                <p className="text-xl font-semibold dashboard-headings">To join an existing interview.</p>
            <div className="flex  items-center  py-2"> 
            <input className="border-gray-400 border-solid border-2 text-gray-700 mr-3 py-1 px-2" type="text" placeholder="Room Id" aria-label="Id" onChange={(e)=>setRoomId(e.target.value)} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleJoinRoom}>
                Join Room
                </button>  
                </div>
                
            </div> 
            <div className="mt-10">
            <p className="text-xl font-semibold dashboard-headings" >To Schedule an Inteview </p>
                    <div className="mt-4 mb-4 text-blue-300">
                        <DateTimePicker
                            className="react-datetime-schedule-graph"
                            onChange={onChange}
                            value={dateValue}
                        />
                    </div>
                    
                    <FormControl>

                    <div className="relative" >
                        <select onChange={handleRoomTypeChange} className="w-full block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 mt-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-module-difficulty" >
                        {roomTypes.map((theme)=>(
                            <option value={theme}>{theme}</option>
                        ))}
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                </FormControl>
                <button className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-full" onClick={handleSchedule}>
                    Schedule Interview
                </button>
            </div>
                
            <div className="mt-10">
                <p className="text-xl font-semibold dashboard-headings">To Contribute and view Questions </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded-full" onClick={handleContribute}>
                    Interview Questions
                </button>
            </div>
            
            <Schedule changeDetector={changeDetector} setLoading={setLoading}/>
            <InviteList changeDetector={changeDetector} setChangeDetector={setChangeDetector} />

            <div className="md:col-span-2 col-span-1">
                <MarksGraph />
            </div>

        </div>
        
        </div>

       
        
    
    </div>
    )
}

export default Dashboard
