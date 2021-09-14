const user = (state={authData:null},action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({...action.payload}));
            return {...state, authData:action.payload}

        case 'LOGOUT':
            window.localStorage.removeItem('profile')
            return {...state, authData:null}

        case 'SET_AUTH_DATA':
            return {...state, authData:action.payload}
      
        default:
            return state
    }
}

export default user