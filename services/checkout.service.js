import axios from "axios";

const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api';

const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/v1/products/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export { getProduct };