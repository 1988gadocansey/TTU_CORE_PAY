import axios from 'axios'
import {ACCESS_TOKEN, API_BASE_URL} from '../constants';

const token = localStorage.getItem(ACCESS_TOKEN)
//console.log("token is "+localStorage.getItem(ACCESS_TOKEN))
const API = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});
API.interceptors.request.use(
    async config => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {

        } else {
            window.location.replace('/')

        }

        return config;
    },

    error => {
        const code = error && error.response ? error.response.status : 0
        if (code === 401 || code === 403 || code === 419) {
            window.location.replace('/')
           // window.location.replace('/login')
        }
        return Promise.reject(error)
    }
);
export default API;

