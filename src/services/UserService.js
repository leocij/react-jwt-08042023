import apiAxios from '../config/ApiAxios';

const headers = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
}

export const index = async () => {
    const response = await apiAxios.get('/users', headers);
    return response.data;
}

export const show = async (id) => {
    const response = await apiAxios.get(`/users/${id}`, headers);
    return response.data;
}

export const postUser = async ({name}) => {
    await apiAxios.post("/users", {name}, headers);
}