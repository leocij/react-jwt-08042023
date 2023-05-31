import ApiAxios from '../config/ApiAxios'

const headers = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('auth-token')}`
    }
}

export const getCheckToken = async (token) => {
    const response = await ApiAxios.get('/auth/check-token', headers)
    return response.data
}

export const postSignIn = async ({email, password}) => {
    const response = await ApiAxios.post('/auth/signin', {email, password})
    return response.data
}