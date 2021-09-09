import * as api from '../../api'
import { NotificationManager } from 'react-notifications';

export const login = (sendData, router) => async (dispatch) => {
    const {data} =await api.login(sendData.result);
    console.log('this is the result of the oauth', data)
    dispatch({type:'AUTH', payload:{result:data, token:sendData.token}});
    router.replace('/user/dashboard')
}

export const getAuthData = (sendData)=> async (dispatch) => {
    try {
        const {data} = await api.login(sendData.result);
        dispatch({type:"SET_AUTH_DATA", payload:{result:data, token:sendData.token}})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}