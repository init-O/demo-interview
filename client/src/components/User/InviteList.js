import React, {useState, useEffect} from 'react'
import InviteEntry from './InviteEntry'
const URL = 'http://localhost:5000'

export default function InviteList() {
    const [invites, setInvites]=useState([])
    const user = JSON.parse(localStorage.getItem('profile'))
    const [changeDetector, setChangeDetector]=useState(true)
    useEffect(()=>
    {
        console.log("This runs")
        fetch(`${URL}/invites/${user.result._id}`)
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
