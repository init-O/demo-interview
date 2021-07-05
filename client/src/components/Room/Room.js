import React, {useEffect, useState, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import { useHistory } from 'react-router'

import Peer from 'peerjs'
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'
import CodeEditor from '../CodeEditor/CodeEditor'
//Material UI imports 
import { Button, Container, Grid, Select, MenuItem, Input, MenuProps, FormControl, InputLabel, TextField, Box, Paper, Typography } from '@material-ui/core'
import { makeStyles, } from '@material-ui/core'



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

}))

export default function Room() {
    const myPeer = new Peer('',{
        host:'/',
        port:9000
    })
    const history = useHistory()
    const classes=useStyles()
    const [openCodeEditor,setOpenCodeEditor]=useState(false)

    const id=useParams()
    const roomId = `${id.id}room`

    
    const peers = {}

    //References fro editor and videos
    const myVideo = useRef();
    const userVideo = useRef();

    const [stream, setStream] = useState()


    //Getting user Media permissons
    useEffect(()=>{

        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(currentStream =>{
            setStream(currentStream)
            myVideo.current.srcObject = currentStream

            socket.on("user-connected", (id)=>{
                console.log('new user',id)
                const call = myPeer.call(id, currentStream)
                console.log('this is call',call)
                if(call){    
                    call.on('stream', userVideoStream =>{
                        console.log('getting new user', userVideoStream)
                        userVideo.current.srcObject = userVideoStream
                    })
        
                    peers[id] = call;
                }
            })

            myPeer.on('call',(call) =>{
                console.log('user is caling....')
                call.answer(currentStream)
                call.on('stream',userVideoStream=>{
                    if(userVideo.current) userVideo.current.srcObject = userVideoStream
                })
            })

        })

        myPeer.on('open',id=>{
            console.log('open peer',id)
            socket.emit('join-room',roomId,id);
        })
    },[])

    //----> All the code for Video Stream <-----
    // myPeer.on('call',(call) =>{
    //     console.log('user is caling....')
    //     call.answer(stream)
    //     call.on('stream',userVideoStream=>{
    //         if(userVideo.current) userVideo.current.srcObject = userVideoStream
    //     })
    // })

    socket.on("user-disconnected",id=>{
        if(peers[id]) peers[id].close()
    
    })

    // socket.on("user-connected", async (id)=>{
    //     console.log('new user',id)
    //     const call = await myPeer.call(id, stream)
    //     console.log('this is call',call)
    //     if(call){    
    //         call.on('stream', userVideoStream =>{
    //             console.log('getting new user', userVideoStream)
    //             userVideo.current.srcObject = userVideoStream
    //         })

    //         peers[id] = call;
    //     }
    // })


    // myPeer.on('open',id=>{
    //     console.log('open peer',id)
    //     socket.emit('join-room',roomId,id);
    // })

    const handleEditorChange=()=>{
        // history.replace(`/room/video/:${roomId}`)
        setOpenCodeEditor(!openCodeEditor)
    }

    return (
        <Container>

                <Grid container align="center">
                    {openCodeEditor && <Grid item sm={12} md={9} className={classes.editorWindow}>
                      <CodeEditor id={id}/>
                    </Grid>}
                    <Grid item sm={12} md={openCodeEditor?3:12} className={classes.webCam}>
                        <Grid container align="center">
                            <Grid item sm={12} md={openCodeEditor?12:6}>
                                <h1 className={classes.editorText}>Webcam 1</h1>
                                <video className={openCodeEditor?classes.videoRefCollapsed:classes.videoRef} playsInline muted ref={myVideo} autoPlay ></video>
                            </Grid>
                            <Grid item sm={12} md={openCodeEditor?12:6} >
                                <h1 className={classes.editorText}>Webcam 2</h1>
                                <video className={openCodeEditor?classes.videoRefCollapsed:classes.videoRef} playsInline  ref={userVideo} autoPlay ></video>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="contained" onClick={handleEditorChange} color={openCodeEditor?"secondary":"primary"}>{openCodeEditor?"Close Editor":"Open Editor"}</Button>
                </Grid>
            
        </Container>
        
    )
}
