import axios from 'axios'

const URL = 'http://localhost:5000'

export const login = (data) => axios.post(`${URL}/user/login`, data)