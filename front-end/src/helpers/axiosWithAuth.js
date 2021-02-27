import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        headers: {
            authorzation : token
        },
        baseURL: 'https://anywhere-fitness-171.herokuapp.com/api'
    })
}