import axios from "axios";

const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api';

const postLogin = (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/login`, formData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.status !== 401) {
                    console.log(error);
                }
                reject(error);
            });
    });
}

export { postLogin };