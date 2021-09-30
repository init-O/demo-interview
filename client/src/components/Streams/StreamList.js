import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {Container} from '@material-ui/core'
import SingleStream from './SingleStream'
import { useHistory } from 'react-router'

import {NotificationManager} from 'react-notifications'

const StreamList = () => {
    const allStreams = useSelector(state => state.Streams)
    const history = useHistory()
    console.log('all streams',allStreams)
    const [streamId,setStreamId] = useState(null)
    const handleStreamWithId=()=>{
        if(streamId){
            history.push(`/stream/${streamId}`)
            setStreamId(streamId)
        }else{
            NotificationManager.error('Come back With Id bro...',"No Stream Id provided")
        }
    }
    return (
        <Container>
            <div className="flex justify-center">
                <h1 className="text-5xl">All Streams</h1>
            </div>
            <div class="flex flex-wrap justify-center mt-2 mx-3 mb-6">
                <div class="w-3/4 px-3">
                    <input class="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="txt" placeholder="Enter Stream Id" onChange={(e)=>setStreamId(e.target.value)}/>
                </div>
                <button className="ml-3 px-4 py-3 mb-3 bg-yellow-500 hover:bg-yellow-700 text-white font-bold border border-blue-700 rounded" onClick={handleStreamWithId}>Go</button>
            </div>
            <div>
                <div className="grid grid-cols-1 px-4 py-2 lg:grid-cols-2 gap-6">
                {allStreams.map(stream=>{
                    return <SingleStream  key={stream._id} stream={stream}/>
                })}
                </div>
            </div>
        </Container>
    )
}

export default StreamList
