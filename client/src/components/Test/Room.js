import React, { useRef } from 'react'
import { useReactMediaRecorder } from "react-media-recorder";
import RecordRTC,{MediaStreamRecorder,invokeSaveAsDialog} from 'recordrtc'

const fileDownload = require('js-file-download')
const Room = () => {

    let rec
    let blobs;
    let blob;
    let stream;
    let voiceStream;
    let desktopStream;
    
    const recorderRef = useRef()
    
    const mergeAudioStreams = (screenStream, voiceStream) => {
        const context = new AudioContext();
        const destination = context.createMediaStreamDestination();

        if (screenStream && screenStream.getAudioTracks().length > 0) {
          const source1 = context.createMediaStreamSource(desktopStream);
          const desktopGain = context.createGain();
          desktopGain.gain.value = 0.6;
          source1.connect(desktopGain).connect(destination);
        }
        
        if (voiceStream && voiceStream.getAudioTracks().length > 0) {
          const source2 = context.createMediaStreamSource(voiceStream);
          const voiceGain = context.createGain();
          voiceGain.gain.value = 0.8;
          source2.connect(voiceGain).connect(destination);
        }
          
        return  destination.stream.getAudioTracks()
      };

      const handleCapture = async ()=>{
        desktopStream = await navigator.mediaDevices.getDisplayMedia({ video:true, audio: true });
        voiceStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

        const tracks = [
            ...desktopStream.getVideoTracks(), 
            ...mergeAudioStreams(desktopStream, voiceStream)
          ];
          
          console.log('Tracks to add to stream', tracks);
          stream = new MediaStream(tracks);
          console.log('Stream', stream)
        
        //blobs.push(MediaRecorder.requestData());
        recorderRef.current = new RecordRTC(stream, {
            type: 'video',
            mimeType: 'video/webm',
       });
       recorderRef.current.startRecording(()=>{
           console.log("startuing recording...",recorderRef.current)
       });
    };
      
      const handleStop = async () => {
        recorderRef.current.stopRecording(() => {
            const recordedVideo = recorderRef.current.getBlob();
            const recordedFile = new File([recordedVideo], "newVideo.mkv",{ type:"video/mp4"});
            invokeSaveAsDialog(recordedFile);
        });
        console.log("stream video",stream.getAudioTracks())
        console.log("stream video",stream.getVideoTracks())
        const aud = stream.getAudioTracks()
        const vid = stream.getVideoTracks()
        stream.getTracks().forEach(track => track.stop())
        await voiceStream.getTracks().forEach(record =>record.stop())
        await desktopStream.getTracks().forEach(record => record.stop())
        stream=null
      }

      return (
        <div>
            <button className="m-3 rounded bg-blue-500 px-3" onClick={handleCapture}>capture</button>
            <button className="m-3 rounded bg-blue-500 px-3" onClick={handleStop}>stop</button>
        </div>
      );
}

export default Room
