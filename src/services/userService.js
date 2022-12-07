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

export const deleteUserById = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/users/delete/${id}`);
};

export const fetchAllPosition = () => {
    return axios.get(`http://localhost:8080/api/v1/group/read`);
};

export const createNewUser = (data) => {
    return axios.post(
        "http://localhost:8080/api/v1/users/create-new-user",
        data
    );
};

export const updateUser = (data) => {
    return axios.put("http://localhost:8080/api/v1/users/update-user", data);
};
