import environment from '../environment.json';

const API_BASE_URL = environment.apiBaseUrl;

export async function getEvents() {  
    try {
        const response = await fetch(`${API_BASE_URL}/events`); 
        
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de gegevens.');
    }
}