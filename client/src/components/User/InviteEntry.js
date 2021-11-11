import React from 'react'
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import {config} from '../../data/Config'

const URL = config.url

export default function InviteEntry({invite, setChangeDetector, changeDetector}) {
    const colors=['bg-red-400', 'bg-green-400', 'bg-yellow-400', 'bg-blue-400', 'bg-pink-400']
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(invite.sentBy)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }

    const handleAccept=()=>
    {
        fetch(`${URL}/invite/${invite._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              }
        })
        .then(res=>res.json())
        .then(json=>{
            setChangeDetector(!changeDetector)
            console.log(json)
        })
    }
    const handleReject=()=>
    {
        fetch(`${URL}/invite/${invite._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
             
        })
        .then(res=>res.json())
        .then(json=>{
            setChangeDetector(!changeDetector)
            console.log(json)
        })
    }
    return (
        <div className={`max-w-md mx-auto ${colors[getRandomInt(0, 5)]} bg-opacity-25 mb-5 rounded-xl shadow-md overflow-hidden md:max-w-2xl`}>
            <div className="grid grid-cols-2">
                <div>
                    <h1 className="font-light text-lg mt-3 mb-3">Invite by {invite.sentBy.name}</h1>
                </div>
                <div>
                    <button onClick={handleAccept} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 mb-3 rounded-full">
                        <CheckIcon /> Accept
                    </button>
                    <button onClick={handleReject} className="bg-red-500 hover:bg-red-700 ml-3 text-white font-bold py-2 px-4 mt-3 mb-3 rounded-full">
                        <CancelIcon /> Reject
                    </button>
                </div>
            </div>
        </div>
    )
}
