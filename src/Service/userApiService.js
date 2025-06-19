import api from './api';

export const loginSuccessful = async (token) => {
    try {
        const response = await api.post('/user/login', { token });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const registerUser = async (userModel) => {
    try {
        const response = await api.post('/user/register', userModel);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const loginLocal = async (loginModel) => {
    try {
        const response = await api.post('/user/loginLocal', loginModel);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await api.get('/user/getUserById', { params: { userId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        throw error;
    }
}