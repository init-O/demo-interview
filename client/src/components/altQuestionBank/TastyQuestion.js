import React from 'react'


export default function altQuestion({question, level }) {
    return (
        <div className=" rounded-full bg-purple-100 m-1 hover:bg-gray-300 flex justify-between content-center items-center cursor-pointer">
           <div className="pl-4 p-1 font-semibold content-center items-center">
            {question}
            </div> 
            <button className={` mr-4 bg-blue-100 hover:bg-gray-100  text-gray-800 font-semibold text-sm px-2  h-6 content-center  border ${level=='Junior'?'border-blue-400':level=='Middle'?'border-green-400':'border-red-400'} rounded-full shadow sm:hidden lg:inline`}>{level}</button>
        </div>
    )
}
