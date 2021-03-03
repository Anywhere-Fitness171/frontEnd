import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('anywhere-fitness-token');
    return axios.create({
        headers: {
            authorization : token
        },
        baseURL: 'https://anywhere-fitness-171.herokuapp.com/api'
    })
}