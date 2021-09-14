import React,{useState, useEffect, useRef} from 'react'
import Peer from 'peerjs'
import {io} from 'socket.io-client'
import { useHistory, useParams } from 'react-router-dom'

const socket=io("https://dragonapp10.herokuapp.com")

const Stream = () => {
    const history = useHistory()
    const streamVideo = useRef()
    const streamId=useParams()
    const roomId = `${streamId.id}room`

    useEffect(()=>{
        const newPeer = new Peer()

        newPeer.on('open', id=>{
            console.log('chal ja bsdk')
            socket.emit("join-stream", roomId, id)
        })

        newPeer.on('call', call=>{
            call.answer()
            call.on('stream',interviewStream=>{
                console.log('getting the stream...',interviewStream)

                if(streamVideo.current) streamVideo.current.srcObject = interviewStream
            })
        })
    },[])


    const handleLeaveStream = ()=>{
        history.replace('/user/dashboard')
    }

    return (
        <div>
            This is stream
            <div className="flex justify-center">
                <video className="w-9/12" playsInline autoPlay ref={streamVideo}></video>
            </div>
            <button onClick={handleLeaveStream} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 mb-3 rounded-full">
                Leave
            </button>
        </div>
    )
}

export default Stream
