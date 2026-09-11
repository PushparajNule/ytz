import axios from 'axios'
import conf from '../conf/conf.js'

const api = axios.create({
    baseURL : conf.VITE_API_URL,
    withCredentials : true
})

export default api;