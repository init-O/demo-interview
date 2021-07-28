import React, { useEffect, useState, useRef } from "react";
 
import { io } from "socket.io-client";  
import { Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./style.css"
import  "./main" 
 
const socket = io("http://localhost:5000");

/////yaar material ui reallyyyyy sucks     :(

// const useStyles = makeStyles((theme) => ({
//   whiteboard: {
//     backgroundColor: "#faf6b9", 
//     width:"1000px",
//         height:"600px",
//         objectFit:"cover"
//   },   
// }));

export default function Room() {
    // const classes=useStyles()      
  return (
    <Container>
        <h1>Whiteboard</h1>
      {/* <canvas className={classes.whiteboard}></canvas> */}
      <canvas className="whiteboard">go canvas</canvas> 
      <div className="colors">
        <div className="color black"></div>
        <div className="color red"></div>
        <div className="color green"></div>
        <div className="color blue"></div>
        <div className="color yellow"></div>
      </div> 
    </Container>    
  );  
}
