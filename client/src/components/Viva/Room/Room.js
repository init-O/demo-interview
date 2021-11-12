import React, {useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router'
import Peer from 'peerjs'
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'
//Material UI imports 
import { Button, Container, Grid, Switch, FormControlLabel} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import MicOpenIcon from '@material-ui/icons/MicTwoTone'
import MicCloseIcon from '@material-ui/icons/MicOffTwoTone'
import VideoOpenIcon from '@material-ui/icons/VideoCallTwoTone'
import VideoCloseIcon from '@material-ui/icons/VideocamOffTwoTone'
import VideoEndIcon from '@material-ui/icons/MissedVideoCallTwoTone'

import {addNewStream, deleteStream} from '../../../action/user/user'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'

import {CopyToClipboard} from 'react-copy-to-clipboard'
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { useBeforeunload } from 'react-beforeunload';

const {create} = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const socket=io("https://dragonapp10.herokuapp.com")
// const socket=io("http://localhost:5000")

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


export default function Room({setNavbarOpen}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes=useStyles()

    const [currentPeerDbId,setcurrentPeerDbId] = useState()
    const [currentPeerDbName,setcurrentPeerDbName] = useState()

    const [myPeer,setMyPeer] = useState();
    const [userId,setUserId]=useState()
    const id=useParams()
    const roomId = `${id.id}room`
    const [micOpen,setMicOpen] = useState(true)
    const [videoOpen,setVideoOpen] = useState(true)
    const [startStream,setStartStream] = useState(false)
    const [streamVideo,setStreamVideo]  = useState(null)
    const [streamName,setStreamName] = useState()

    const user = JSON.parse(localStorage.getItem('profile'))

    
    const peers = {}

    //References fro editor and videos
    const myVideo = useRef();
    const userVideo = useRef();
    const videoGridContainer = useRef();

    var myVideoContainer = document.createElement('video');
    myVideoContainer.muted = true;
    const groupVideoContainer = document.getElementById("video-grid-container");
    
    const [stream, setStream] = useState()
    
    const addStream = (currentStream,video) => {
        video.srcObject = currentStream
        video.width = "300"
        video.height = "300"
        video.className = "px-3 py-3 border m-2 bg-black"

        video.onloadedmetadata = function(e) {
            video.play();
        };
        videoGridContainer.current?.append(video)

    }


    //Getting user Media permissons
    useEffect(()=>{

        const newPeer = new Peer()
        setNavbarOpen(false)
        setMyPeer(newPeer)
        newPeer.on('open', id=>{
            if(!userId){
                console.log('user connected...',id, window.location.href)//Getting new 
                setUserId(id)
                socket.emit('join-room', roomId,id,user?.result?._id,user?.result?.name)
            }
        })
        NotificationManager.success("Starting Interview....","Created Room")
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(currentStream =>{
            setStream(currentStream)
            
            addStream(currentStream,myVideoContainer)
            
            socket.on("user-connected",  (id,peerId, peerName)=>{
                    setcurrentPeerDbId(peerId)
                    setcurrentPeerDbName(peerName)
                    socket.emit("giving-back-id",user?.result._id, user?.result.name)
                    var video = document.createElement("video")
                    console.log('new user',id)

                    if(!peers[id]){
                    const call = newPeer.call(id, currentStream)
                    console.log('this is call',call)
                    console.log('chal raha hai yeh...')
                    call.on('stream', userVideoStream =>{
                        console.log('getting new user', userVideoStream)
                        addStream(userVideoStream,video)
                    })

                    call.on('close',()=>{
                        video.remove()
                    })
        
                    peers[id] = call;}
            })
        
        
            newPeer.on('call',(call) =>{
                console.log('user is caling....')
                call.answer(currentStream)
                peers[call.peer] = call;
                var video = document.createElement('video')
                call.on('stream',userVideoStream=>{
                    addStream(userVideoStream,video)
                })

                call.on('close',()=>{
                    video.remove()
                })
            })
        })

        socket.on("get-back-id",(peerId,peerName)=>{
            setcurrentPeerDbId(peerId)
            setcurrentPeerDbName(peerName)
        })

        socket.on("user-disconnected",id=>{
            console.log('user disconnected...',id)
            if(peers[id]) {
                console.log('closing...',peers)
                peers[id].close()
            }
            
        })

    },[])

    const handleMicToggle = () =>{
        const enabled = stream.getAudioTracks()[0].enabled
        if(enabled){
            stream.getAudioTracks()[0].enabled = false;
            setMicOpen(false)
        }else{
            stream.getAudioTracks()[0].enabled = true;
            setMicOpen(true)
        }
    }

    const handleVideoToggle = () =>{
        const enabled = stream.getVideoTracks()[0].enabled
        if(enabled){
            stream.getVideoTracks()[0].enabled = false;
            setVideoOpen(false)
        }else{
            stream.getVideoTracks()[0].enabled = true;
            setVideoOpen(true)
        }
    }

    const handleLeaveCall=() =>{
        if(streamVideo){
            NotificationManager.warning("please close before leaving", "Stream Running")
        }else{
            setNavbarOpen(true)
            const tracks = stream.getTracks()
            tracks.forEach(track => track.stop())
            NotificationManager.error("","Ending Interview")
            // stream.getaudioTracks.forEach(track =>{
            //     track.stop()
            // })
            socket.disconnect();
            history.replace('/user/dashboard/')
        }
    }

    


    return (
        <Container>

                    <div >
                        <div className="flex justify-start flex-wrap" id="video-grid-container" ref={videoGridContainer}></div>
                        
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
                    </div>
                    
                    <div className="flex">

                    <div className="px-2 h-20 w-25 mt-7">
                        <CopyToClipboard text={`${window.location.href}`}
                            onCopy={() => {NotificationManager.info("","Copied Room Link")}}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-700 rounded">
                                Room Link
                                <FileCopyIcon  className="ml-1 text-black" fontSize="default" />
                            </button>
                        </CopyToClipboard>
                    </div>

                    <div className="px-2 h-20 w-25 mt-7">
                        <CopyToClipboard text={`${id.id}`}
                            onCopy={() => {NotificationManager.warning("","Copied Stream Id")}}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-700 rounded">
                                Stream Id
                                <FileCopyIcon className="ml-1 text-black" fontSize="default" />
                            </button>
                        </CopyToClipboard>
                    </div>
                    </div>
                
        </Container>

         
        
    )
}
