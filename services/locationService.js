import AsyncStorage from '@react-native-async-storage/async-storage';
import environment from '../environment.json';

const API_BASE_URL = environment.apiBaseUrlDevelopment;

export async function getTopLocations() { 
    const token = await AsyncStorage.getItem('token'); 
    try {
        const response = await fetch(`${API_BASE_URL}/locations/top`, {
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

export async function addLocation(locationData) {
    const token = await AsyncStorage.getItem('token'); 
    try {
        console.log(locationData)
        const response = await fetch(`${API_BASE_URL}/locations`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: locationData.name,
                address: locationData.address,
                isPublic: locationData.isPublic,
            }),
        });

        if(!response.ok) {
            const error = await response.json();
            if(error.message){
                throw new Error(error.message);
            }
            throw new Error('Er is iets misgegaan bij het toevoegen van de locatie.');
        }
        return response;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function getLocations(searchValue) {
    const token = await AsyncStorage.getItem('token'); 
    try {
        const response = await fetch(`${API_BASE_URL}/locations/search?query=${searchValue}`, {
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

