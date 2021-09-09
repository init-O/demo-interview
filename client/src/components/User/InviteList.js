import React, {useState, useEffect} from 'react'
import InviteEntry from './InviteEntry'
const URL = 'https://dragonapp10.herokuapp.com'

export default function InviteList({changeDetector, setChangeDetector}) {
    const [invites, setInvites]=useState([])
    const user = JSON.parse(localStorage.getItem('profile'))
    useEffect(()=>
    {
        console.log("This runs")
        fetch(`${URL}/invites/${user?.result._id}`)
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json)
            setInvites(json)
        })
    }, [changeDetector])
    
    return (
        <div className="ml-5">
            <h1 className="text-4xl mt-4 mb-4 font-light" >Pending Invites</h1>
            {
                invites.map((invite)=>{
                    if (!invite.accepted)
                    {
                        return (<InviteEntry invite={invite} setChangeDetector={setChangeDetector} changeDetector={changeDetector} />)
                    }
                }
                    
                )
            }
        </div>
    )
}
