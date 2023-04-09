import apiAxios from '../config/ApiAxios';

export const index = async () => {
    const response = await apiAxios.get('/users');
    return response.data;
}