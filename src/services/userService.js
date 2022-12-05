import axios from "axios";

export const registerNewUser = (data) => {
    return axios.post("http://localhost:8080/api/v1/register-user", data);
};

export const userLogin = (data) => {
    return axios.post("http://localhost:8080/api/v1/login-user", data);
};

export const fetchAllUser = (page, limit) => {
    return axios.get(
        `http://localhost:8080/api/v1/users/read?page=${page}&limit=${limit}`
    );
};
