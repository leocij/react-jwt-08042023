import apiAxios from '../config/ApiAxios';

const headers = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
}

export const index = async () => {
    const response = await apiAxios.get('/expertises', headers);
    return response.data;
}

// export const store = async ({expertise}) => {
//     const response = await apiAxios.post("/expertises", {expertise}, headers);
//     return response.data;
// }