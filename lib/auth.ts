import { API_BASE_URL } from '@/constants/config';
import * as SecureStore from 'expo-secure-store';

export const getToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('access_token');
};

export const checkTokenValid = async (): Promise<boolean> => {
    const token = await getToken();
    if (!token) return false;

    try {
        const response = await fetch(`${API_BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.ok;
    } catch (err) {
        return false;
    }
};