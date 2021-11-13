import React, { useEffect, useState, useRef } from "react";
 
import { io } from "socket.io-client";  
import { Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./style.css"
import { config } from "../../../data/Config";
 
const URL = config.url
const socket=io(URL)

/////yaar material ui reallyyyyy sucks     :(

// const useStyles = makeStyles((theme) => ({
//   whiteboard: {
//     backgroundColor: "#faf6b9", 
//     width:"1000px",
//         height:"600px",
//         objectFit:"cover"
//   },   
// }));

export default function WhiteBoard() {
    //State Setup
    const canvasRef=useRef(null)
    const colorsRef=useRef(null)
    const [socket, setSocket]=useState(null)
    const [canvas, setCanvas]=useState(null)
    const [colors, setColors]=useState(null)
    const [current, setCurrent]=useState({
      color: "black",
      x: null,
      y: null
    })
    const [context, setContext]=useState(null)
    const [drawing, setDrawing]=useState(false)

    //Utility function for color picker
    const onColorUpdate=(e)=>{
      const currentColor= e.target.className.split(" ")[1];
      setCurrent({...current, color: currentColor})
      
    }
    
    //Canvas drawing functions

    function drawLine(x0, y0, x1, y1, color, emit) {
      if (context==null)
        return 
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }
      var w = canvas.width;
      var h = canvas.height;

      socket.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
      });
    }

    function onMouseDown(e) {
      console.log("Mouse is down")
      setDrawing(true)
      setCurrent({...current, x: e.clientX, y: e.clientY})

      
    }

    function onMouseUp(e) {

      console.log("Mouse is up")
      setDrawing(false)
      drawLine(
        current.x,
        current.y,
        e.clientX,
        e.clientY,
        current.color,
        true
      );
    }

    function onMouseMove(e) {
      if (!drawing)
        return
      console.log("Mouse is moving")
      setCurrent({...current, x: e.clientX, y: e.clientY})
      drawLine(
        current.x,
        current.y,
        e.clientX,
        e.clientY,
        current.color,
        true
      );
      
    }

    function throttle(callback, delay) {
      var previousCall = new Date().getTime();
      return function () {
        var time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }

    function onDrawingEvent(data) {
      var w = canvas.width;
      var h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }


    useEffect(()=>
    {
      console.log(current)
    }, [current])
    //Setup of Canvas and Color Picker from refs
    useEffect(()=>
    {
      if (canvasRef==null || colorsRef==null)
        return
      setColors(colorsRef.current)
      setCanvas(canvasRef.current)
    }, [])
    
    /*
    useEffect(()=>
    {
      if (canvas==null || context==null)
        return
     
      canvas.addEventListener("mousedown", onMouseDown, false);
      canvas.addEventListener("mouseup", onMouseUp, false);
      canvas.addEventListener("mouseout", onMouseUp, false);
      canvas.addEventListener("mousemove",onMouseMove, false);
      
      canvas.addEventListener("touchstart", onMouseDown, false);
      canvas.addEventListener("touchend", onMouseUp, false);
      canvas.addEventListener("touchcancel", onMouseUp, false);
      canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);
    }, [canvas, context])
    */
    useEffect(()=>
    {
      if (canvas==null)
        return 
      const tempContext=canvas.getContext("2d")
      setContext(tempContext)

    }, [canvas])

    //Setup of Event Listeners for the color picker
    useEffect(()=>
    {
      if (canvas==null || colors==null)
        return 
      
      for (var i=0;i<colors.children.length;i++)
      {
        colors.children[i].addEventListener('click', onColorUpdate, false)
      }

    }, [canvas, colors])
    
    //Socket IO Setup for client side
    useEffect(()=>{
      setSocket(soc)
      return ()=>{
          if(socket) socket.disconnect()
      }
    }, [])
    
  return (
    <Container>
        <h1>Whiteboard</h1>
     
        <canvas className="whiteboard" ref={canvasRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseOut={onMouseUp}> go canvas</canvas> 
        <div className="colors" ref={colorsRef}>
        <div className="color black"></div>
        <div className="color red"></div>
        <div className="color green"></div>
        <div className="color blue"></div>
        <div className="color yellow"></div>
        <button>Hey</button>
      </div> 
    </Container>    
  );  
}
