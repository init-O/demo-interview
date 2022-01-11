import * as api from '../../api'
import { NotificationManager } from 'react-notifications';

export const login = (sendData, router) => async (dispatch) => {
    const {data} =await api.login(sendData);
    console.log('this is the result of the oauth', data)
    dispatch({type:'AUTH', payload:{result:data, token:sendData.token}});
    router.replace('/user/dashboard')
}

export const customLogin =  (sendData, isModal, setOpen, history) => async (dispatch) => {
    try {
      const response = await api.customLogin(sendData);
      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      dispatch({type:'AUTH', payload:{result:data}});
      if (isModal) setOpen(false);
      history.push("/user/dashboard");
    } catch (error) {
      setOpen(true);
      NotificationManager.error("Register With Us", "Sign In Failed", 3000);
      history.push("/");
      console.log(error);
    }
  };

export const googleLogin =  (sendData, isModal, setOpen, history) => async (dispatch) => {
    try {
        console.log("login", sendData)
      const response = await api.googleLogin(sendData);
      if (response.status !== 200) throw Error(response.data.message);
      const data = response.data;
      dispatch({type:'AUTH', payload:{result:data}});
      if (isModal) setOpen(false);
      history.push("/user/dashboard");
    } catch (error) {
      setOpen(true);
      NotificationManager.error("Register With Us", "Sign In Failed", 3000);
      history.push("/");
      console.log(error);
    }
  };

export const customSignup =  (sendData, setIsLogin) => async (dispatch) => {
    try {
        const response = await api.customSignup(sendData);
  
        if (response.status !== 200) throw new Error(response.data.message);
        const data = response.data;
        setIsLogin(true);
      } catch (error) {
        NotificationManager.error("user already exists", "Sign Up Failed", 2000);
        console.log(error);
      }
  };


export const getAuthData = (sendData)=> async (dispatch) => {
    try {
        const {data} = await api.login(sendData.result);
        dispatch({type:"SET_AUTH_DATA", payload:{result:data, token:sendData.token}})
    } catch (error) {
        NotificationManager.error(error.response.data.error)
    }
}