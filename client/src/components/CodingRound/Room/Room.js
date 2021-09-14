import React, {useEffect, useState, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import { useHistory } from 'react-router'
import Peer from 'peerjs'
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { createActiveInterview } from '../../../action/user/user'
import CodeEditor from '../CodeEditor/CodeEditor'
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

import {addNewStream, deleteStream} from '../../../action/user/user'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'

import {CopyToClipboard} from 'react-copy-to-clipboard'
import FileCopyIcon from '@material-ui/icons/FileCopy';

const {create} = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const socket=io("https://dragonapp10.herokuapp.com")

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
    const dispatch = useDispatch()
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
    const [streamName,setStreamName] = useState()

    const [insideMeeting,setInsideMeeting] = useState(false)
    const [meetingClosed,setMeetingClosed] = useState(false)
    const [pdfHash,setPdfHash] = useState()

    const user = JSON.parse(localStorage.getItem('profile'))

    
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
        NotificationManager.success("Starting Interview....","Created Room")
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(currentStream =>{
            setStream(currentStream)
            myVideo.current.srcObject = currentStream

            socket.on("meeting-closed-exit",()=>{
                console.log("meeting is closed")
                if(!userVideo.current?.srcObject){
                    const tracks = currentStream.getTracks()
                    tracks.forEach(track => track.stop())
                    history.replace('/user/dashboard')
                }
            })

            socket.on("user-connected",  (id)=>{
                if(userVideo.current?.srcObject){
                    socket.emit("meeting-closed")
                }else{
                    setInsideMeeting(true)
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
                }
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
            if(peers[id]) {
                userVideo.current.srcObject = null
                peers[id].close()
            }
            
        })

        socket.on('user-change-editor',value=>{
            setOpenCodeEditor(value)
            setOpenWhiteboard(!value)
        })

        socket.on("upload-question-pdf-hash",hash=>{
            console.log('naya hash aaya hau///', hash)
            setPdfHash(hash)
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
        const tracks = stream.getTracks()
        tracks.forEach(track => track.stop())
        NotificationManager.error("","Ending Interview")
        // stream.getaudioTracks.forEach(track =>{
        //     track.stop()
        // })
        socket.disconnect();
        history.replace('/user/dashboard')
    }


    //----> All the code for Video Stream <-----

    const handleEditorChange=()=>{
        // history.replace(`/room/video/:${roomId}`)
        socket.emit('change-editor',!openCodeEditor)
        setOpenCodeEditor(!openCodeEditor)
        setOpenWhiteboard(false)
    }

    const handleWhiteboardChange=()=>
    {
        socket.emit('change-editor',!openCodeEditor)
        setOpenWhiteboard(!openWhiteboard)
        setOpenCodeEditor(false)
    }

    const handleStartStream = ()=>{
        if(!startStream){
            try {
                if(streamName && roomId){
                    const sendData = {streamId:`${id.id}`, name:streamName, type: "Coding Interview"}
                    console.log('Stream Data',sendData)
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
                        NotificationManager.warning("","Stating Live stream")
                        setStreamVideo(displayMedia)
                        setStartStream(!startStream)
                        dispatch(addNewStream(sendData)) 
                        socket.on("user-join-stream",userId=>{
                            
                            console.log('stream dekhne aaya hai log....')
                            const call = myPeer.call(userId, displayMedia)
                            
                        })
                    })
                }else if(!streamName){
                    NotificationManager.info("","Enter the Name of Live Stream")
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            if(streamVideo){
                NotificationManager.error("","Ending Live Stream")
                dispatch(deleteStream(`${id.id}`))
                const tracks = streamVideo.getTracks()

                tracks.forEach(track => track.stop())
                setStreamVideo(null)
                setStartStream(!startStream)
            }
        }
    }

    const handleUploadCustomQuestion = (e) =>{
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend =async ()=>{
            const buffer = new Buffer(reader.result)
            const result =await ipfs.add(buffer)
            setPdfHash(result.path)
        }
    }

    const handleUploadPdf = (e) =>{
        e.preventDefault()
        const link=`https://ipfs.infura.io/ipfs/${pdfHash}`
    
        socket.emit('upload-question-pdf',pdfHash)
    }

    return (
        <Container>

                <Grid container >
                    {openCodeEditor && <Grid item sm={12} md={9} className={classes.editorWindow}>
                      <CodeEditor id={id}/>
                    </Grid>}
                    {openWhiteboard && <Grid item sm={12} md={9}>
                      <Whiteboard />
                    </Grid>}
                    <Grid item sm={12} md={openCodeEditor||openWhiteboard?3:12} className={classes.webCam}>
                        <Grid container align="center">
                            <Grid item sm={12} md={openCodeEditor||openWhiteboard?12:6}>
                                <h1 className={classes.headingText}>Webcam 1</h1>
                                <Grid item sm={12} md={12}>
                                <video className={openCodeEditor||openWhiteboard?classes.videoRefCollapsed:classes.videoRef} playsInline muted ref={myVideo} autoPlay ></video>
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
                            <Grid item sm={12} md={openCodeEditor||openWhiteboard?12:6} >
                                <h1 className={classes.headingText}>Webcam 2</h1>
                                <video className={openCodeEditor||openWhiteboard?classes.videoRefCollapsed:classes.videoRef} playsInline  ref={userVideo} autoPlay ></video>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className="px-2 h-20 w-25 mt-7">
                        <Button variant="contained" onClick={handleEditorChange} color={openCodeEditor?"secondary":"primary"}>{openCodeEditor?"Close Editor":"Open Editor"}</Button>
                    </div>
                    <div className="px-2 h-20 w-25 mt-7">
                        <Button variant="contained" onClick={handleWhiteboardChange} color={openWhiteboard?"secondary":"primary"}>{openWhiteboard?"Close Whiteboard":"Open Whiteboard"}</Button>
                    </div>
                    <div class="mb-4 mr-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Stream Name
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Stream Name" onChange={(e)=>{setStreamName(e.target.value)}}/>
                    </div>
                    <div className="px-2 h-20 w-25 mt-7">
                        <Button variant="contained" onClick={handleStartStream} color={startStream?"secondary":"primary"}>{!startStream?"start stream":"stop stream"}</Button>
                    </div>

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
                </Grid>
                <Grid item sm={12} md={12} >
                    {
                        resume?
                        <div className="justify-center">
                            <button  className="m-3 px-3 py-2 bg-red-500 text-white hover:bg-red-700 rounded" onClick={()=>setResume(!resume)}>Interview Questions</button>
                                {/* <iframe src={user.result.resume} height="100%" width="" frameborder="2"></iframe> */}
                            <object data={user.result.resume} type="application/pdf" width="100%" height="600">
                                <p>Your web browser doesn't have a PDF plugin.
                                Instead you can <a href={user.result.resume}>click here to
                                download the PDF file.</a></p>
                            </object>
                        </div>:
                        <div>
                            <button className="m-3 px-3 py-2 bg-red-500 text-white hover:bg-red-700 rounded" onClick={()=>setResume(!resume)}>open resume</button>
                            <input type="file" className="m-3 px-2 py-2" accept=".pdf" onChange={handleUploadCustomQuestion}/>
                            <button className="m-3 px-3 py-2 bg-yellow-400 text-red-500 hover:bg-yellow-500 rounded" onClick={handleUploadPdf}>UPLOAD PDF QUEsTIONS</button>
                        <Grid sm={12} md={12}>
                            <h1 className="mt-4" >Interview Questions</h1>
                            {!singleQuestionview ? 
                            <ViewIntreViewQuestion setQuestionBankId={setQuestionBankId} setSingleQuestionview={setSingleQuestionview} singleQuestionview={singleQuestionview}/> 
                            : <SingleQuestionBankView questionBankId={questionBankId} setSingleQuestionview={setSingleQuestionview} singleQuestionview={singleQuestionview}/>} 
                        </Grid>
                        <Grid sm={12} md={12}>
                        {pdfHash && <object data={`https://ipfs.infura.io/ipfs/${pdfHash}`} type="application/pdf" width="100%" height="600">
                                <p>Your web browser doesn't have a PDF plugin.
                                Instead you can <a href={`https://ipfs.infura.io/ipfs/${pdfHash}`}>click here to
                                download the PDF file.</a></p>
                            </object>}
                        </Grid>
                        </div>
                
                    } 
                </Grid>
            
        </Container>
        
    )
}
