import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const SingleStream = ({stream}) => {
    const history = useHistory()
    const user =JSON.parse(localStorage.getItem('profile'))
    const handleOpenStream = ()=>{
        history.push(`/stream/${stream.streamId}`)
    }

    return (
        <div className="flex justify-between py-2 m-3">
            <div>
                <h1 className="text-xl font-bold">{stream.name.toUpperCase()}</h1>
                <span className="font-light">{stream.type}  {stream.streamId}</span>
            <div className=" QuestionPack-Background border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-2">
                <div className="text-blue-400 font-bold text-2xl mb-1">{stream.name.toUpperCase()}</div>
                <div className="text-yellow-300 font-bold text-lg mb-1">{stream.type}  </div>
                </div>
                <div className="flex items-center">
                    <img className="w-11 h-11 p-0.5 rounded-full bg-pink-200 mr-4" src={stream.created_by?.profilePic?`${stream.created_by.profilePic}`:user.result.profilePic} alt="Avatar of Jonathan Reinink"/>
                <div className="text-sm text-pink-400">
                    <p className="text-whiteleading-none">{stream.created_by?.name?`${stream.created_by.name}`.toUpperCase():`${user.result.name}`.toUpperCase()}</p>
                    
                    <p >Started {moment(stream.modified_on).fromNow()}</p>
                </div>
                </div>
                <div className="flex justify-around mt-2">
                <button className="px-2 ml-2 h-10 w-20 bg-blue-400 hover:bg-blue-500 text-black rounded" onClick={handleOpenStream}>Join</button>
                </div>
            </div>


            </div>
        </div>
    )
}

export default SingleStream
