import React, {useEffect, useState, useRef} from 'react'

import Peer from 'peerjs'
import {io} from 'socket.io-client'
import { useParams, useHistory } from 'react-router-dom'
import EditorThemes from '../../data/EditorThemes'
//Material UI imports 
import { Button, Container, Grid, Select, MenuItem, Input, MenuProps, FormControl, InputLabel, TextField, Box, Paper, Typography } from '@material-ui/core'
import { makeStyles, } from '@material-ui/core'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';



const socket=io("http://localhost:5000")

const useStyles=makeStyles((theme)=>({

    editorText:{
        color:"#FF9B36"
    },

    webCam:{
        backgroundColor:"#031632"
    },

    videoRef:{
        width:"400px",
        height:"400px",
        objectFit:"cover"
    }


}))

export default function VideoPlayer() {
    const myPeer = new Peer('',{
        host:'/',
        port:9000
    })
    const classes=useStyles()
    const history = useHistory()

    
    const {videoId} = useParams()
    const roomId = videoId
    const peers = {}

    //References fro videos
    const myVideo = useRef();
    const userVideo = useRef();

    //Video states
    const [stream, setStream] = useState()
    

    //Getting user Media permissons
    useEffect(()=>{

        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(currentStream =>{
            setStream(currentStream)
            myVideo.current.srcObject = currentStream
        })
    },[])

    //----> All the code for Video Stream <-----
    myPeer.on('call',(call) =>{
        console.log('user is caling....')
        call.answer(stream)
        call.on('stream',userVideoStream=>{
            if(userVideo.current) userVideo.current.srcObject = userVideoStream
        })
    })

    socket.on("user-disconnected",id=>{
        if(peers[id]) peers[id].close()
    
    })

    socket.on("user-connected", async (id)=>{
        console.log('new user',id)
        const call = await myPeer.call(id, stream)
        console.log('this is call',call)
        if(call){    
            call.on('stream', userVideoStream =>{
                console.log('getting new user', userVideoStream)
                userVideo.current.srcObject = userVideoStream
            })

            peers[id] = call;
        }
    })

    myPeer.on('open',id=>{
        console.log('open peer',id)
        socket.emit('join-room',roomId,id);
    })

    const createRoomwithEditor= ()=>{
        history.replace(`/room/:${videoId}`);
    }

    return (
        <Grid container className={classes.webCam}>
                <Grid container align="center">
                    <Grid item sm={12} md={6}>
                        <h1 className={classes.editorText}>Webcam 1</h1>
                        <video className={classes.videoRef} playsInline muted ref={myVideo} autoPlay ></video>
                    </Grid>
                    <Grid item sm={12} md={6} >
                        <h1 className={classes.editorText}>Webcam 2</h1>
                        <video className={classes.videoRef} playsInline  ref={userVideo} autoPlay ></video>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={createRoomwithEditor}>open editor</Button>
        </Grid>
        
    )
}
