import * as api from '../../api'
import {NotificationManager} from 'react-notifications'

export const createQuestionBank = (sendData,setLoading) => async (dispatch) => {
    try {
        const response = await api.createQuestionBank(sendData)
        console.log("reponse check...", response.status,response.ok)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        setLoading(false)
        NotificationManager.info("","Created New Question Bank")
        dispatch({type:'CREATE_QUESTION_BANK', payload:data})
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const getQuestionBank = () => async (dispatch) => {
    try {
        const response = await api.getQuestionBank()
        console.log("reponse check...", response.status,response)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        dispatch({type:'GET_QUESTION_BANK', payload:data})
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const getSingleQuestionBank = async (id,setLoading) => {
    try {
        // setLoading(true)
        const response = await api.getSingleQuestionBank(id)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        // setLoading(false)
        return data.questions
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const addQuestionToBank = async (id,sendData,setLoading) =>{
    try {
        const response = await api.addQuestionToBank(id,sendData)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        setLoading(false)
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const deleteQuestionBank = (id,setLoading) => async (dispatch) => {
    try {
        const response = await api.deleteQuestionBank(id)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        setLoading(false)
        NotificationManager.error("","Question Bank Deleted!")
        dispatch({type:'DELETE_QUESTION_BANK', payload:id})
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const deleteQuestion = (id,setLoading, getQuestions) => async (dispatch) => {
    try {
        const response = await api.deleteQuestion(id)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        setLoading(false)
        getQuestions()
        NotificationManager.error("","Question Deleted!")
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const changeUsername = async  (sendData, setLoading) => {
    try {
        const response = await api.changeUsername(sendData)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        setLoading(false)
        NotificationManager.success("","Username Changed")
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const scheduleInterview =  (sendData, setLoading) => async (dispatch) => {
    try {
        const response = await api.scheduleInterview(sendData)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        dispatch({type:"ADD_MEETING", payload:data})
        setLoading(false)
        NotificationManager.info("","scheduled New Interview")
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const createActiveInterview=  async (sendData) =>
{
    try {
        const response= await api.createActiveInterview(sendData)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const deleteRoom = (id,setLoading) => async (dispatch) =>{
    try {
        const response = await api.deleteRoom(id)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        setLoading(false)
        dispatch({type:"DELETE_MEETING", payload:id})
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const getscheduledInterviews = (id) => async (dispatch) =>{
    try {
        const response = await api.getscheduledInterviews(id)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        dispatch({type:"GET_MEETINGS",payload:data})
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const getAllStreams = () => async (dispatch) =>{
    try {
        const response = await api.getAllStreams()
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        dispatch({type:"GET_ALL_STREAMS",payload:data})
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const addNewStream = (sendData) => async (dispatch) =>{
    try {
        const response = await api.addNewStream(sendData)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        dispatch({type:"ADD_STREAM",payload:data})
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const deleteStream = (id) => async (dispatch) =>{
    try {
        await api.deleteStream(id)
        dispatch({type:"DELETE_STREAM",payload:id})
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const uploadResume = async (sendData,setLoading) =>{
    try {
        await api.uploadResume(sendData)
        setLoading(false)
        NotificationManager.success("","Uploaded resume successfully")
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const getsahebquestion = async (id) => {
    try {
        const response = await api.getsahebquestion(id)
        if(response.status== 400 || response.status== 404 || response.status==500) {
            throw new Error(response.status)
        }
        const {data} = response;
        return data 
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const addInterviewScore = async (sendData) =>{
    try {
        await api.addInterviewScore(sendData)
    } catch (error) {
        NotificationManager.error('',error.response.data.message)
    }
}

export const uploadNewVideo = async (sendData,setLoading) =>{
    try {
        const {data} = await api.uploadNewVideo(sendData)
        console.log("new video", data)
    } catch (error) {
        console.log("this error...|",'',error.response)
        NotificationManager.error('',error.response.data.message)
    }
    setLoading(false)
}

export const getAllVideos = async (setVideos) =>{
    try {
        const {data} = await api.getAllVideos()
        setVideos(data)
    } catch (error) {
        console.log("this error...|",'',error.response)
        NotificationManager.error('',error.response.data.message)
    }
}

export const getSiteData= async (setSiteInfo) =>
{
    try{
        const {data}= await api.getSiteInfo()
        setSiteInfo(data)
    }
    catch(error)
    {
        console.log(error)
    }
}


export const postHitInfo = async ()=>
{
    try{
        const {data}=await api.postHit()

    }
    catch(err)
    {
        console.log(err)
    }
}
