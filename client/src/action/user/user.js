import * as api from '../../api'

export const createQuestionBank = (sendData) => async (dispatch) => {
    const {data} = await api.createQuestionBank(sendData)
    dispatch({type:'CREATE_QUESTION_BANK', payload:data})
}

export const getQuestionBank = () => async (dispatch) => {
    const {data} = await api.getQuestionBank()
    dispatch({type:'GET_QUESTION_BANK', payload:data})
}

export const getSingleQuestionBank = async (id) => {
    const {data} = await api.getSingleQuestionBank(id)
    return data.questions
}

export const addQuestionToBank = async (id,sendData) =>{
    const {data} = await api.addQuestionToBank(id,sendData)
}

export const deleteQuestionBank = (id) => async (dispatch) => {
    const {data} = await api.deleteQuestionBank(id)
    dispatch({type:'DELETE_QUESTION_BANK', payload:id})
}

export const changeUsername = async  (sendData) => {
    const {data} = await api.changeUsername(sendData)
}

export const scheduleInterview =  (sendData) => async (dispatch) => {
    const {data} = await api.scheduleInterview(sendData)
    dispatch({type:"ADD_MEETING", payload:data})
}

export const createActiveInterview=  async (sendData) =>
{
    const {data}= await api.createActiveInterview(sendData)
}

export const deleteRoom = (id) => async (dispatch) =>{
    const {data} = await api.deleteRoom(id)
    dispatch({type:"DELETE_MEETING", payload:id})
}

export const getscheduledInterviews = (id) => async (dispatch) =>{
    const {data} = await api.getscheduledInterviews(id)
    dispatch({type:"GET_MEETINGS",payload:data})
}