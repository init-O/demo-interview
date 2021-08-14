import React, {useState,useEffect} from 'react'
import {MenuItem, Select, FormControl, InputLabel} from '@material-ui/core'
import { useHistory } from 'react-router'
import {useDispatch} from 'react-redux'
import {getQuestionBank} from '../../action/user/user'

const Dashboard = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user)

    const [roomId,setRoomId] = useState('')
    const roomTypes = ["Coding Round", "Machine Learning", "Viva"]
    const [currentRoomType,setCurrentRoomType] = useState("Coding Round")

    useEffect(() => {
        dispatch(getQuestionBank())
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

    return (
       <div className="relative min-h-screen grid grid-cols-1 sm:grid-cols-4  ">
        <div className="bg-blue-500  col-span-1  items-strech">
        <div className="m-3 p-3 flex">
        <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white "src={user.result.profilePic} alt="" /> 
        <div >
        <span className="text-2xl   m-2 font-extrabold ">{user.result.name.split(" ")[0]}</span> <br></br>
        <span className="italic"> @{user.result.username}</span>
        </div>
        </div>
        <button  href="#" className="text-white font-bold px-6 py-4 rounded outline-none focus:outline-none ml-6 mr-1 mb-1 bg-yellow-500 active:bg-red-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
        Update User Name
        </button>
        </div>

        <div className="p-10 text-2x1 font-bold col-span-3">
            <p className="text-xl font-semibold">To join a new interview.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCreateRoom}>
             Create Room
           </button>

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

           <p className="text-xl font-semibold">To join existing interview.</p>
           <div className="flex  items-center  py-2"> 
           <input className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2  focus:outline" type="text" placeholder="Room Id" aria-label="Id" onChange={(e)=>setRoomId(e.target.value)} />
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleJoinRoom}>
            Join Room
            </button>  
            </div>
            <p className="text-xl font-semibold">To Contribute and view Question </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleContribute}>
             Interview Questions
           </button>
        </div>
        </div>
    )
}

export default Dashboard
