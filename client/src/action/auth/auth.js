import * as api from '../../api'

export const login = (sendData, router) => async (dispatch) => {
    const {data} = api.login(sendData.result);
    dispatch({type:'AUTH', payload:{result:data, token:sendData.token}});
    router.push('/')
}