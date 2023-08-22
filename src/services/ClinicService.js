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

export const store = async ({cnpj, corporateName}) => {
    const response = await apiAxios.post("/clinics", {cnpj, corporateName}, headers);
    return response.data;
}