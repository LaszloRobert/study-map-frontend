import api from './api';

export const getUnlockedCounties = async (userId) => {
    try {
        const response = await api.get(`/county/getUnlockedCounties`, {
            params: { userId }
        });
       
        return response.data; // expected to be a list of strings
    } catch (error) {
        console.error('Error fetching unlocked counties:', error);
        throw error;
    }
};


export const unlockCountyForUser = async (userId, county, remainedCoins) => {
    try {
        const response = await api.post(`/county/unlockCounty`, {
            userId,
            county
        }, {
            params: { remainedCoins }
        });
        return response.data;
    } catch (error) {
        console.error('Error unlocking county:', error);
        throw error;
    }
};

export const saveUserCoins = async (userId, coins) => {
    try {
        const response = await api.post(`/county/saveUserCoins`, {
            userId,
            coins
        });
        return response.data;
    } catch (error) {
        console.error('Error saving user coins:', error);
        throw error;
    }
};