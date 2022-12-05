import axios from "axios";

export const registerNewUser = (data) => {
    return axios.post("http://localhost:8080/api/v1/register-user", data);
};
