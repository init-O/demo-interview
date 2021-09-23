import React from 'react'


export default function altQuestion({question, level }) {
    return (
        <div className="mt-5 pt-5 pl-2 mb-5 pb-3 rounded-full hover:bg-gray-200 flex justify-between cursor-pointer">
           <div className="font-semibold">
            {question}
            </div> 
            <button className={`bg-white hover:bg-gray-100  text-gray-800 font-semibold py-2 px-4 border ${level=='Junior'?'border-blue-400':level=='Middle'?'border-green-400':'border-red-400'} rounded-full shadow sm:hidden lg:inline`}>{level}</button>
        </div>
    )
}
