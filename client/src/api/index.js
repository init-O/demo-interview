import axios from 'axios'

const URL = 'http://localhost:5000'

export const login = (data) => axios.post(`${URL}/user/login`, data)

export const createQuestionBank = (data) => axios.post(`${URL}/questionPack`,data)

export const getQuestionBank = () => axios.get(`${URL}/questionPacks`)

export const getSingleQuestionBank = (id) => axios.get(`${URL}/questionPack/${id}`)

export const addQuestionToBank = (id,data) => axios.post(`${URL}/question/${id}`,data)

export const deleteQuestionBank = (id) => axios.delete(`${URL}/questionPack/${id}`)