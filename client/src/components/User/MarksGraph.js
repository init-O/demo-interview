import React,{useState, useEffect} from 'react'
import { Bar,Line } from 'react-chartjs-2';
import DatePicker from 'react-date-picker'
import {config} from '../../data/Config'

const URL = config.url
const MarksGraph = () => {
    
    const [realScore,setRealScore] = useState()
    const [realMonth,setRealMonth] = useState()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [selectedDate, handleDateChange] = useState(new Date());
  
    var scoreList = [];
    var monthNames=[]
    
    const intilizeScoreList = () => {
        const days = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1,0).getDate()
        for(var i=0;i<days;i++){
          scoreList.push(0)
        }
        for(var i=0;i<days;i++){
          var monthname = new Date(`${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${i+1}`).toDateString().slice(4,10)
          monthNames.push(monthname)
        }
        setRealMonth(monthNames)
        
        const fetchScore = async () => {
          const response = await fetch(`${URL}/user/interviewScores`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({userId:user?.result?._id, start:`${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-01`, end:`${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${days}`})
          })
          return response.json()
        }
        
        fetchScore().then(data => {
          console.log(data)
          data.map(singleData=>{
            scoreList[parseInt(singleData.date)]+=parseInt(singleData.marks)
          })
          setRealScore(scoreList)
      })
  
      console.log(monthNames)
  
    }
  
    useEffect(() => {
      intilizeScoreList()
    },[selectedDate])



    return (
        <div>
            <div className="m-2 flex justify-center text-blue-500">
                <DatePicker
                    className="react-datetime-schedule-graph"
                    views={["year", "month"]}
                    label="Year and Month"
                    helperText="With min and max"
                    minDate={new Date("2021-09-01")}
                    maxDetail="year"
                    minDetail="month"
                    value={selectedDate}
                    format="MMMM y"
                    onChange={handleDateChange}
                />
            </div>
            <div className="bg-white w-screen md:w-full h-80">
            <Bar
                data={{
                labels:realMonth,
                datasets:[
                    {
                    label:'Scores',
                    data:realScore,
                    backgroundColor:["green"],
                    borderColor:["orange"],
                    borderWidth:1
                    }
                ]
                }}
                options={{
                maintainAspectRatio: false ,
                scales: {
                    yAxes: [
                    {
                        stacked: true,
                        ticks: {
                          max:50,
                        beginAtZero: true,
                        },
                    },
                    ],
                    xAxes: [
                    {
                        stacked: true,
                    },
                    ],
                },
                }}
            />
            </div>
        </div>
    )
}

export default MarksGraph
