import axios from 'axios';
const axiosIns = axios.create({
// You can add your headers here
// ================================
    baseURL:import.meta.env.VITE_baseURL,
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Authorization":`Bearer ` +localStorage.getItem('accessToken'),

    }
})

export default axiosIns
