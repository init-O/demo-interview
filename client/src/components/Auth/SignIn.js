import React, {useState} from 'react'
import {GoogleLogin} from 'react-google-login'
import { Grid, Typography, Container, Button, Modal, makeStyles} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import { login } from '../../action/auth/auth.js'
import {useHistory} from 'react-router-dom'

import {NotificationManager} from 'react-notifications'

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
    paper_mobile:{

    },
    baseContainer: {

    },
    modalText: {
        marginBottom: '10%'
    }
  }))

const SignIn = ({setNotification}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes=useStyles()
    const [open, setOpen]=useState(true)
    const handleClose=()=>
    {
        setOpen(false)
        NotificationManager.error("try logging in again", "Google Login Failed");
        history.push('/')
    }
    

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log('google result', result)
        NotificationManager.success("Success", `Logged in as ${result?.email}`);
        dispatch(login({result,token}, history));    
      };
    
    const googleFailure = async () => {
        NotificationManager.error("try logging in again", "Google Login Failed");
        history.replace('/')
    }
    const body=(
        <div className={classes.paper}>
            <p className={classes.modalText} >Log in using Google</p>
                <GoogleLogin
                    // ---> CREATE YOUR OWN GOOGLE CLIENT FROM "console.developers.google.com" AND PASTE HERE (DELETE IT BEFORE PUSHING) <---
                    clientId="845509955979-rd59hfvhufjcfnqfjnidlvm1mgqv1jkg.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                
        </div>
    )

    return(
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
    )

    
}

export default SignIn