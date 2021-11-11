import React, {useState, useEffect} from 'react'
import InviteEntry from './InviteEntry'
import {config} from '../../data/Config'

const URL = config.url

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
            <h1 className="text-4xl mt-4 mb-4 font-light dashboard-headings" >Pending Invites</h1>
            {
                invites?.map((invite)=>{
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
