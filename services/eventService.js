import AsyncStorage from '@react-native-async-storage/async-storage';
import environment from '../environment.json';

const API_BASE_URL = environment.apiBaseUrlDevelopment;

export async function getEvents() { 
    const token = await AsyncStorage.getItem('token'); 
    try {
        const response = await fetch(`${API_BASE_URL}/events`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de gegevens.');
    }
}