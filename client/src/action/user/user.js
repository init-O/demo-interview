import * as api from '../../api'
import {NotificationManager} from 'react-notifications'

export const createQuestionBank = (sendData,setLoading) => async (dispatch) => {
    try {
        const {data} = await api.createQuestionBank(sendData)
        setLoading(false)
        NotificationManager.info("","Created New Question Bank")
        dispatch({type:'CREATE_QUESTION_BANK', payload:data})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const getQuestionBank = () => async (dispatch) => {
    try {
        const {data} = await api.getQuestionBank()
        dispatch({type:'GET_QUESTION_BANK', payload:data})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const getSingleQuestionBank = async (id,setLoading) => {
    try {
        // setLoading(true)
        const {data} = await api.getSingleQuestionBank(id)
        // setLoading(false)
        return data.questions
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const addQuestionToBank = async (id,sendData,setLoading) =>{
    try {
        const {data} = await api.addQuestionToBank(id,sendData)
        setLoading(false)
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const deleteQuestionBank = (id,setLoading) => async (dispatch) => {
    try {
        const {data} = await api.deleteQuestionBank(id)
        setLoading(false)
        NotificationManager.error("","Question Bank Deleted!")
        dispatch({type:'DELETE_QUESTION_BANK', payload:id})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const deleteQuestion = (id,setLoading, getQuestions) => async (dispatch) => {
    try {
        const {data} = await api.deleteQuestion(id)
        setLoading(false)
        getQuestions()
        NotificationManager.error("","Question Deleted!")
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const changeUsername = async  (sendData, setLoading) => {
    try {
        const {data} = await api.changeUsername(sendData)
        setLoading(false)
        NotificationManager.success("","Username Changed")
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const scheduleInterview =  (sendData, setLoading) => async (dispatch) => {
    try {
        const {data} = await api.scheduleInterview(sendData)
        dispatch({type:"ADD_MEETING", payload:data})
        setLoading(false)
        NotificationManager.info("","scheduled New Interview")
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const createActiveInterview=  async (sendData) =>
{
    try {
        const {data}= await api.createActiveInterview(sendData)
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const deleteRoom = (id,setLoading) => async (dispatch) =>{
    try {
        const {data} = await api.deleteRoom(id)
        setLoading(false)
        dispatch({type:"DELETE_MEETING", payload:id})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const getscheduledInterviews = (id) => async (dispatch) =>{
    try {
        const {data} = await api.getscheduledInterviews(id)
        dispatch({type:"GET_MEETINGS",payload:data})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const getAllStreams = () => async (dispatch) =>{
    try {
        const {data} = await api.getAllStreams()
        dispatch({type:"GET_ALL_STREAMS",payload:data})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const addNewStream = (sendData) => async (dispatch) =>{
    try {
        const {data} = await api.addNewStream(sendData)
        dispatch({type:"ADD_STREAM",payload:data})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const deleteStream = (id) => async (dispatch) =>{
    try {
        await api.deleteStream(id)
        dispatch({type:"DELETE_STREAM",payload:id})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const uploadResume = async (sendData,setLoading) =>{
    try {
        await api.uploadResume(sendData)
        setLoading(false)
        NotificationManager.success("","Uploaded resume successfully")
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const getsahebquestion = async (id) => {
    try {
        const {data} = await api.getsahebquestion(id)
        return data 
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

export const addInterviewScore = async (sendData) =>{
    try {
        await api.addInterviewScore(sendData)
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}

