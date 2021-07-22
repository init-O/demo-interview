import * as api from '../../api'

export const login = (sendData, router) => async (dispatch) => {
    const {data} =await api.login(sendData.result);
    console.log('this is the result of the oauth', data)
    dispatch({type:'AUTH', payload:{result:data, token:sendData.token}});
    router.push('/user/dashboard')
}