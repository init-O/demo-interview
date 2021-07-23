import React, {useEffect, useState, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import { useHistory } from 'react-router'

import Peer from 'peerjs'
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'
import CodeEditor from '../CodeEditor/CodeEditor'
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
    const [userId,setUserId]=useState()
    const id=useParams()
    const roomId = `${id.id}room`
    const [micOpen,setMicOpen] = useState(true)
    const [videoOpen,setVideoOpen] = useState(true)

    
    const peers = {}

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
            setOpenCodeEditor(value)
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
        socket.disconnect();
        // stream.getAudioTracks.forEach(track =>{
        //     track.stop()
        // })
        history.replace('/')
    }


    //----> All the code for Video Stream <-----

    const handleEditorChange=()=>{
        // history.replace(`/room/video/:${roomId}`)
        socket.emit('change-editor',!openCodeEditor)
        setOpenCodeEditor(!openCodeEditor)
    }

    return (
        <Container>

                <Grid container >
                    {openCodeEditor && <Grid item sm={12} md={9} className={classes.editorWindow}>
                      <CodeEditor id={id}/>
                    </Grid>}
                    <Grid item sm={12} md={openCodeEditor?3:12} className={classes.webCam}>
                        <Grid container align="center">
                            <Grid item sm={12} md={openCodeEditor?12:6}>
                                <h1 className={classes.headingText}>Webcam 1</h1>
                                <Grid item sm={12} md={12}>
                                <video className={openCodeEditor?classes.videoRefCollapsed:classes.videoRef} playsInline muted ref={myVideo} autoPlay ></video>
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
                            <Grid item sm={12} md={openCodeEditor?12:6} >
                                <h1 className={classes.headingText}>Webcam 2</h1>
                                <video className={openCodeEditor?classes.videoRefCollapsed:classes.videoRef} playsInline  ref={userVideo} autoPlay ></video>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="contained" onClick={handleEditorChange} color={openCodeEditor?"secondary":"primary"}>{openCodeEditor?"Close Editor":"Open Editor"}</Button>
                </Grid>
            
        </Container>
        
    )
}
