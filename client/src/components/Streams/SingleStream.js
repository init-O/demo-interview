import React from 'react'
import { useHistory } from 'react-router-dom'

const SingleStream = ({stream}) => {
    const history = useHistory()

    const handleOpenStream = ()=>{
        history.push(`/stream/${stream.streamId}`)
    }

    return (
        <div className="flex justify-between py-2 m-3">
            <div>
                <h1 className="text-xl font-bold">{stream.name.toUpperCase()}</h1>
                <span className="font-light">{stream.type}  {stream.streamId}</span>
            </div>
            <button className="px-2 ml-2 h-10 w-20 bg-blue-400 hover:bg-blue-500 text-black rounded" onClick={handleOpenStream}>Join</button>
        </div>
    )
}

export default SingleStream
