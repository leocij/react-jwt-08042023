import apiAxios from "../config/ApiAxios";

const headers = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
}

export const postCredential = async ({userId, email, password}) => {
    const response = await apiAxios.post("/credentials", {userId, email, password}, headers);
    return response.data;
}