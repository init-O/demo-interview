import React from 'react'
import { useSelector } from 'react-redux'
import {Container} from '@material-ui/core'
import SingleStream from './SingleStream'

const StreamList = () => {
    const allStreams = useSelector(state => state.Streams)
    console.log('all streams',allStreams)
    return (
        <Container>
            <div className="flex justify-center">
                <h1 className="text-5xl">All Streams</h1>
            </div>
            <div>
                {allStreams.map(stream=>{
                    return <SingleStream  key={stream._id} stream={stream}/>
                })}
            </div>
        </Container>
    )
}

export default StreamList
