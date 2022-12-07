// import axios from "axios";
import axios from "../setup/axios";

export const registerNewUser = (data) => {
    return axios.post("/api/v1/register-user", data);
};

export const userLogin = (data) => {
    return axios.post("/api/v1/login-user", data);
};

export const fetchAllUser = (page, limit) => {
    return axios.get(`/api/v1/users/read?page=${page}&limit=${limit}`);
};

export const deleteUserById = (id) => {
    return axios.delete(`/api/v1/users/delete/${id}`);
};

export const fetchAllPosition = () => {
    return axios.get(`/api/v1/group/read`);
};

export const createNewUser = (data) => {
    return axios.post("/api/v1/users/create-new-user", data);
};

export const updateUser = (data) => {
    return axios.put("/api/v1/users/update-user", data);
};
