import axios from "../setup/axios";

export const createRole = (data) => {
    return axios.post("/api/v1/role/create", data);
};

export const getAllRole = (page, limit) => {
    return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
};
