import React,{useState,useEffect} from 'react'
import {getAllVideos} from '../../action/user/user'

const Main = () => {
    const [videos,setVideos] = useState([])
    useEffect(() =>{
        getAllVideos(setVideos)
    },[])
    return (
        <div className="flex flex-wrap justify-center">
            {videos.map(v =>{
                return (
                    <div className="px-2 py-2 m-3 lg:w-5/12 md:w-3/4 sm:w-full">
                        <video className="w-full mb-2" src={v.videoHash} controls></video>
                        <div>
                            {v.name}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Main
