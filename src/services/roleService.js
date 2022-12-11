import axios from "../setup/axios";

export const createRole = (data) => {
    return axios.post("/api/v1/role/create", data);
};

export const getAllRole = (page, limit) => {
    return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
};

export const deleteRole = (role) => {
    return axios.delete(`/api/v1/role/delete`, { data: role });
};

export const getAllRoleOnePage = () => {
    return axios.get(`/api/v1/role/read-one-page`);
};

export const getRoleByGroupId = (id) => {
    return axios.get(`/api/v1/role/by-group-id/${id}`);
};

export const assignRoleForGroup = (data) => {
    return axios.post("/api/v1/role/create-role", data);
};
