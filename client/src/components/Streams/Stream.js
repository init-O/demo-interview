import React,{useState, useEffect, useRef} from 'react'
import Peer from 'peerjs'
import {io} from 'socket.io-client'
import { useHistory, useParams } from 'react-router-dom'
import ReplyIcon from '@material-ui/icons/Reply';
import ShareIcon from '@material-ui/icons/Share';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {NotificationManager} from 'react-notifications'
import { EmailShareButton, WhatsappShareButton, TelegramShareButton, LinkedinShareButton, FacebookShareButton} from 'react-share';
import { EmailIcon, WhatsappIcon, TelegramIcon, LinkedinIcon, FacebookIcon } from 'react-share';
import {  Container,Modal, makeStyles} from '@material-ui/core'

import FileCopyIcon from '@material-ui/icons/FileCopy';

const socket=io("https://dragonapp10.herokuapp.com")

const useStyles=makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.up('md')]:{
            position: 'absolute',
            width: "30%",
            height: '300px',
            left: '37.5%',
            top: "25%",
            fontSize: '1.25vw',
        },
        [theme.breakpoints.down('sm')]:{
          fontSize: '32px',
            width: "100%",
            height: '100%',
        },
  
        
        textAlign: 'center'
      },
    baseContainer: {

    },
    modalText: {
        marginBottom: '10%'
    }
  }))

const Stream = () => {
    const history = useHistory()
    const streamVideo = useRef()
    const streamId=useParams()
    const classes=useStyles()
    const roomId = `${streamId.id}room`
    const [open, setOpen]=useState(false)

    const handleClose=()=>
    {
        setOpen(false)
    }
    const handleOpen=()=>
    {
        setOpen(true)
    }

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

    const body=(
        <div className="m-2">
             <CopyToClipboard text={`${window.location.href}`}
                onCopy={() => {NotificationManager.warning("","Copied Stream Id")}}>
                <button className="bg-red-500 ml-1 mb-1 h-8 w-8 hover:bg-red-700 text-white font-bold rounded-full">
                    <i className=" text-lg h-5 w-5  font-bold text-black align-middle"><FileCopyIcon /> </i>
                </button>
            </CopyToClipboard>
            <div>
                <WhatsappShareButton
                url={`${window.location.href}`}
                title={"Join the ongoing interview"}
                separator=":: "
            >
                <WhatsappIcon size={38} round />
            </WhatsappShareButton>
                
            </div>

            <div>
            <TelegramShareButton
            url={`${window.location.href}`}
            title={"Join the ongoing interview"}
          >
            <TelegramIcon size={38} round />
          </TelegramShareButton>

            </div>

            <div>
                
            <EmailShareButton
            url={`${window.location.href}`}
            subject={"Join the ongoing interview"}
            body="Come join for some focussed interview prep stream."
          >
            <EmailIcon size={38} round />
          </EmailShareButton>
            </div>

            <div>
            <FacebookShareButton
            url={`${window.location.href}`}
            quote={"Join the ongoing interview"}
          >
            <FacebookIcon size={38} round />
          </FacebookShareButton>
            </div>

            <div>   
          <LinkedinShareButton url={`${window.location.href}`}>
            <LinkedinIcon size={38} round />
          </LinkedinShareButton>

            </div>


          
        
       
         </div>
        
    )

    return (
        <div className="relative">
            {!streamVideo.current?.srcObject && <h1 className="block text-xl text-red-500 ">Stream has ended</h1> }
            <div className="flex justify-center h-full">
            {/* ref={streamVideo} */}
                    <video className="w-full h-screen lg:w-3/4" playsInline autoPlay ref={streamVideo} controls></video>
            </div>
            <Container className={classes.baseContainer}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
            {body}
            </Modal>
            </Container>
            <div className="flex justify-around content-around">
                {!open ? <button onClick={handleLeaveStream} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 mb-3 rounded">
                    <i className=" text-black text-lg font-bold align-middle"> <ReplyIcon /> Leave</i>
                </button>
                : <button onClick={handleLeaveStream} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mt-3 mb-3 rounded" disabled>
                    <i className=" text-black text-lg font-bold align-middle"> <ReplyIcon /> Leave</i>
                </button>}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-3 mb-3 rounded" onClick={handleOpen}>
                    <i className=" text-lg font-bold text-black align-middle"><ShareIcon /> Share </i>
                </button>
            </div>
        </div>
    )
}

export default Stream
