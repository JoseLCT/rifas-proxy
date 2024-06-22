const { default: axios } = require("axios");

const BASE_URL = "http://127.0.0.1:8000/api/";

const postLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}token/`, {
            username,
            password,
        })
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
const postRefresh = (refreshToken) =>{
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}token/refresh/`, {
            refresh: refreshToken
        })
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
module.exports = {
    postLogin,
    postRefresh
};