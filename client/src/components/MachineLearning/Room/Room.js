import React, {useEffect, useState, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import { useHistory } from 'react-router'

import Peer from 'peerjs'
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'
import Whiteboard from '../Whiteboard/Whiteboard'
import ViewIntreViewQuestion from '../../QuestionBankView/Main'
import SingleQuestionBankView from '../../QuestionBankView/SingleQuestionBankView'
//Material UI imports 
import { Button, Container, Grid} from '@material-ui/core'
import { makeStyles, } from '@material-ui/core'

import MicOpenIcon from '@material-ui/icons/MicTwoTone'
import MicCloseIcon from '@material-ui/icons/MicOffTwoTone'
import VideoOpenIcon from '@material-ui/icons/VideoCallTwoTone'
import VideoCloseIcon from '@material-ui/icons/VideocamOffTwoTone'
import VideoEndIcon from '@material-ui/icons/MissedVideoCallTwoTone'



const socket=io("http://localhost:5000")

const useStyles=makeStyles((theme)=>({


    webCam:{
        backgroundColor:"#031632"
    },

    videoRefCollapsed:{
        width:"200px",
        height:"200px",
        objectFit:"cover"
    },

    videoRef:{
        width:"400px",
        height:"400px",
        objectFit:"cover"
    },
    editorWindow:{
        backgroundColor:"#252520",
        color:"#FF9B36"
    },
    controlButtons:{
        margin:"3px",
    },
    controlButtonAlt:
    {
        borderColor: '#f50057',
        color: '#f50057',
        marginRight: '5px',
        borderRadius: '0%',
        '&:hover': {
            backgroundColor: '#f50057',
            color: 'white',
            borderColor: '#f50057'
        }
    },
    headingText:
    {
        color: 'white',
        fontWeight: '200'
    }

}))


export default function Room() {

    const history = useHistory()
    const classes=useStyles()
    const [myPeer,setMyPeer] = useState();
    const [openCodeEditor,setOpenCodeEditor]=useState(false)
    const [openWhiteboard, setOpenWhiteboard]=useState(false)
    const [userId,setUserId]=useState()
    const id=useParams()
    const roomId = `${id.id}room`
    const [micOpen,setMicOpen] = useState(true)
    const [videoOpen,setVideoOpen] = useState(true)
    const [singleQuestionview,setSingleQuestionview] = useState(false)
    const [questionBankId,setQuestionBankId] = useState()
    const [resume,setResume] = useState(true)
    const [startStream,setStartStream] = useState(false)
    const [streamVideo,setStreamVideo]  = useState(null)

    
    const peers = {}
    const user = JSON.parse(localStorage.getItem('profile'))

    //References fro editor and videos
    const myVideo = useRef();
    const userVideo = useRef();

    const [stream, setStream] = useState()


    //Getting user Media permissons
    useEffect(()=>{

        const newPeer = new Peer()

        setMyPeer(newPeer)
        newPeer.on('open', id=>{
            console.log('user connected...',id)
            setUserId(id)
            socket.emit('join-room', roomId,id)
        })

        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(currentStream =>{
            setStream(currentStream)
            myVideo.current.srcObject = currentStream

            socket.on("user-connected",  (id)=>{
                console.log('new user',id)
                if(id!==userId){
                const call = newPeer.call(id, currentStream)
                console.log('this is call',call)
                console.log('chal raha hai yeh...')
                call.on('stream', userVideoStream =>{
                    console.log('getting new user', userVideoStream)
                    userVideo.current.srcObject = userVideoStream
                })
    
                peers[id] = call;}
            })
        
            newPeer.on('call',(call) =>{
                console.log('user is caling....')
                call.answer(currentStream)
                call.on('stream',userVideoStream=>{
                    if(userVideo.current) userVideo.current.srcObject = userVideoStream
                })
            })
        })


        socket.on("user-disconnected",id=>{
            console.log('user disconnected...',id)
            if(peers[id]) peers[id].close()
            
        })

        socket.on('user-change-editor',value=>{
            setOpenWhiteboard(value)
        })
    },[])

    const handleMicToggle = () =>{
        const enabled = myVideo.current.srcObject.getAudioTracks()[0].enabled
        if(enabled){
            myVideo.current.srcObject.getAudioTracks()[0].enabled = false;
            setMicOpen(false)
        }else{
            myVideo.current.srcObject.getAudioTracks()[0].enabled = true;
            setMicOpen(true)
        }
    }

    const handleVideoToggle = () =>{
        const enabled = myVideo.current.srcObject.getVideoTracks()[0].enabled
        if(enabled){
            myVideo.current.srcObject.getVideoTracks()[0].enabled = false;
            setVideoOpen(false)
        }else{
            myVideo.current.srcObject.getVideoTracks()[0].enabled = true;
            setVideoOpen(true)
        }
    }

    const handleLeaveCall=() =>{
        // stream.getaudioTracks.forEach(track =>{
        //     track.stop()
        // })
        socket.disconnect();
        history.replace('/user/dashboard')
    }


    //----> All the code for Video Stream <-----

    const handleWhiteboardChange=()=>
    {
        socket.emit('change-editor',!openWhiteboard)
        setOpenWhiteboard(!openWhiteboard)
    }

    const handleStartStream = ()=>{
        if(!startStream){
            try {           
                navigator.mediaDevices.getDisplayMedia({
                    video: {
                        cursor: "always"
                    },
                    audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                    }
                }).then(displayMedia =>{
                    setStreamVideo(displayMedia)
                    socket.on("user-join-stream",userId=>{
    
                        console.log('stream dekhne aaya hai log....')
                        const call = myPeer.call(userId, displayMedia)
    
                    })
                })
                setStartStream(!startStream)
            } catch (error) {
                console.log(error)
            }
        }else{
            if(streamVideo){
                const tracks = streamVideo.getTracks()

                tracks.forEach(track => track.stop())
                setStreamVideo(null)
                setStartStream(!startStream)
            }
        }
    }

    return (
        <Container>

                <Grid container >
                    {openWhiteboard && <Grid item sm={12} md={9}>
                      <Whiteboard />
                    </Grid>}
                    <Grid item sm={12} md={openWhiteboard?3:12} className={classes.webCam}>
                        <Grid container align="center">
                            <Grid item sm={12} md={openWhiteboard?12:6}>
                                <h1 className={classes.headingText}>Webcam 1</h1>
                                <Grid item sm={12} md={12}>
                                <video className={openWhiteboard?classes.videoRefCollapsed:classes.videoRef} playsInline muted ref={myVideo} autoPlay ></video>
                                </Grid>
                                <Grid item sm={12} md={12} align="space-between">
                                    {micOpen? <Button className={classes.controlButtonAlt} variant="outlined" color="secondary" onClick={handleMicToggle}>
                                        <MicCloseIcon />
                                    </Button>:
                                    <Button className={classes.controlButtons} onClick={handleMicToggle}>
                                        <MicOpenIcon />
                                    </Button>
                                    }
                                    {videoOpen? <Button className={classes.controlButtonAlt} variant="outlined" color="secondary" onClick={handleVideoToggle}>
                                        <VideoCloseIcon />
                                    </Button>:
                                    <Button  className={classes.controlButtons} onClick={handleVideoToggle}>
                                        <VideoOpenIcon />
                                    </Button>
                                    }
                                    <Button className={classes.controlButtonAlt} onClick={handleLeaveCall} variant="outlined" >
                                        <VideoEndIcon />Leave
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} md={openWhiteboard?12:6} >
                                <h1 className={classes.headingText}>Webcam 2</h1>
                                <video className={openWhiteboard?classes.videoRefCollapsed:classes.videoRef} playsInline  ref={userVideo} autoPlay ></video>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="contained" onClick={handleWhiteboardChange} color={openWhiteboard?"secondary":"primary"}>{openWhiteboard?"Close Whiteboard":"Open Whiteboard"}</Button>
                    <Button variant="contained" onClick={handleStartStream} color={startStream?"secondary":"primary"}>{!startStream?"start stream":"stop stream"}</Button>
                </Grid>
                <Grid item sm={12} md={12} >
                    {
                        resume?
                        <div className="justify-around">
                            <Button variant="contained" color="secondary" onClick={()=>setResume(!resume)}>Interview Questions</Button>
                            <iframe src={user.result.resume} height="800" width="800" frameborder="2"></iframe>
                        </div>:
                        <Grid>
                            <Button variant="contained" color="secondary" onClick={()=>setResume(!resume)}>open resume</Button>
                            <h1 className="mt-4" >Interview Questions</h1>
                            {!singleQuestionview ? 
                            <ViewIntreViewQuestion setQuestionBankId={setQuestionBankId} setSingleQuestionview={setSingleQuestionview} singleQuestionview={singleQuestionview}/> 
                            : <SingleQuestionBankView questionBankId={questionBankId} setSingleQuestionview={setSingleQuestionview} singleQuestionview={singleQuestionview}/>} 
                        </Grid>
                
                    } 
                </Grid>
            
        </Container>
        
    )
}
