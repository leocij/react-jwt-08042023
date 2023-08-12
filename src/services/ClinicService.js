import apiAxios from '../config/ApiAxios';

const headers = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
}

export const index = async () => {
    const response = await apiAxios.get('/clinics', headers);
    return response.data;
}