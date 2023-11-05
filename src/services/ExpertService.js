import apiAxios from '../config/ApiAxios';

const headers = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
}

export const index = async () => {
    const response = await apiAxios.get('/experts', headers);
    return response.data;
}

export const store = async ({expert}) => {
    const response = await apiAxios.post("/experts", {expert}, headers);
    return response.data;
}