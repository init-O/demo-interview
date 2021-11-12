import React, {useState} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import SearchIcon from '@material-ui/icons/Search';
import CallIcon from '@material-ui/icons/Call';
import DeleteIcon from '@material-ui/icons/DeleteOutlineSharp'
import { Grid, Typography, Container, Button, Modal, makeStyles} from '@material-ui/core'
import { EmailShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, FacebookShareButton} from 'react-share';
import { EmailIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, FacebookIcon } from 'react-share';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {deleteRoom} from '../../action/user/user'
import {config} from '../../data/Config'

const URL = config.url

const useStyles=makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "30%",
      height: '500px',
      left: '37.5%',
      top: "25%",
      position: 'absolute',
      fontSize: '1.25vw',
      textAlign: 'center'
    },
    baseContainer: {

    },
    modalText: {
        marginBottom: '10%'
    }
  }))

export default function InterviewEntry({interview, setLoading}) {
    const history=useHistory()
    const classes=useStyles()
    const user = JSON.parse(localStorage.getItem('profile'))
    const colors=['bg-red-400', 'bg-green-400', 'bg-yellow-400', 'bg-blue-400', 'bg-pink-400']
    const [open, setOpen]=useState(false)
    const [searchText, setSearchText]=useState('')
    const [searchResults, setSearchResults]=useState([])
    const [interviewId, setInterviewId]=useState('')
    const dispatch = useDispatch()

    const handleClose=()=>
    {
        setOpen(false)
    }
    const handleOpen=(id)=>
    {
        setInterviewId(id)
        setOpen(true)
    }

    const handleSearchChange=(e)=>
    {
        setSearchText(e.target.value)
    }

    const handleJoinRoom=(roomId)=>
    {
        history.push(`/room/${roomId}`)
    }

    const handleJoinMLRoom=(roomId)=>
    {
        history.push(`/ml/room/${roomId}`)
    }

    const handleSearch=(e)=>
    {   
        e.preventDefault()
        console.log(searchText)
        const data={
            name: searchText
        }
        fetch(`${URL}/user/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
             body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
            setSearchResults(json)
        })
    }

    const sendInvite=(id)=>
    {
        setLoading(true)
        const data={
            sentBy: user?.result._id,
            sentTo: id
        }
        fetch(`${URL}/invite/${interview._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
             body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(json=>{
            setLoading(false)
            console.log(json)
        })
    }

    const handleDeleteRoom = (id)=>{
        setLoading(true)
        dispatch(deleteRoom(id,setLoading))
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }


    const body=(
        <div className={classes.paper}>
            <WhatsappShareButton
            url={`http://localhost:3000/${interview.roomId}`}
            title={interview.type}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TelegramShareButton
            url={`http://localhost:3000/${interview.roomId}`}
            title={interview.type}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>

            <EmailShareButton
            url={`http://localhost:3000/${interview.roomId}`}
            subject={interview.type}
            body="Come join for some focussed interview prep"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        
          <FacebookShareButton
            url={`http://localhost:3000/${interview.roomId}`}
            quote={interview.type}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <LinkedinShareButton url={`http://localhost:3000/${interview.roomId}`}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

            <p className={classes.modalText} >Search User to invite By Name <button className="bg-blue-500 ml-16 hover:bg-blue-700 text-white font-bold  w-10 items-center justify-center rounded-full" onClick={handleClose}>X</button></p>
            <div className="bg-white flex items-center rounded-full shadow-xl">
                <input onChange={handleSearchChange} className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" />
                
                <div className="p-4">
                <button onClick={handleSearch} className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                    <SearchIcon />
                </button>
                </div>
            </div>
            {
            searchResults.map((result)=>(
                <div className="bg-gray-200 mt-4"> 
                    <p>{result.name}<button className="bg-blue-500 hover:bg-blue-700 ml-6 text-white font-bold py-2 px-4 mt-3 rounded-full" onClick={()=>sendInvite(result._id)}><PersonAddIcon/></button></p>
                    
                </div>
            ))
            }
         </div>
        
    )
    return (
        <div className={`max-w-md mx-auto ${interview.accepted?colors[1]:colors[0]} bg-opacity-50 mb-5 rounded-xl shadow-md overflow-hidden md:max-w-2xl`}> 
                    <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            {body}
            </Modal>

                    <div className="grid justify-items-stretch px-4 py-4 text-black ">
                        <div>
                        
                            <h1 className="font-normal text-xl">{interview.type}</h1>
                            <p className="font-light">Scheduled on: <span className="font-medium">{new Date(interview.scheduledDate).toUTCString()}</span> by <span className="font-medium">{interview.createdBy.name}</span></p>
                        </div>
                        <div>
                            <button onClick={()=>handleOpen(interview._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-full">
                                <PersonAddIcon/> Invite
                            </button>
                            <button onClick={()=>interview.type=='Coding Round'?handleJoinRoom(interview.roomId):handleJoinMLRoom(interview.roomId)} className="bg-green-500 hover:bg-green-700 ml-2 text-white font-bold py-2 px-4 mt-3 rounded-full">
                                <CallIcon /> Join
                            </button>
                            <button onClick={()=>handleDeleteRoom(interview.roomId)} className="bg-red-600 text--black hover:bg-red-800 font-bold py-2 mt-3 px-4 ml-2 rounded-full" >
                                <DeleteIcon />
                            </button>
                            
                        </div>
                    </div>
                    

                </div>
    )
}
