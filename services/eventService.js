import AsyncStorage from '@react-native-async-storage/async-storage';
import environment from '../environment.json';

const API_BASE_URL = environment.apiBaseUrlDevelopment;

export async function getUpcomingEvents() { 
    const token = await AsyncStorage.getItem('token'); 
    try {
        const response = await fetch(`${API_BASE_URL}/events/upcoming`, {
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

export async function getEventById(eventId) {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
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

export async function getGoingEvents() {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/attendance/going`, {
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

export async function getMaybeEvents() {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/attendance/maybe`, {
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

export async function addEvent(eventData) {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/events`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if(!response.ok) {
            const error = await response.json();
            console.log(error)
            if(error.message){
                throw new Error(error.message);
            }
            throw new Error('Er is iets misgegaan bij het toevoegen van het evenement.');
        }
        return response;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function getEvents(searchValue) {
    if(searchValue == ""){
        return [];
    }
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/events/search/${searchValue}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok) {
            throw new Error('Er is iets misgegaan bij het zoeken naar evenementen.');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de gegevens.');
    }
}

export async function updateEvent(eventId, eventData) {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if(!response.ok) {
            throw new Error('Er is iets misgegaan bij het wijzigen van het evenement.');
        }
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Er is iets misgegaan bij het wijzigen van het evenement.');
    }
}

export async function deleteEvent(eventId) {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok) {
            throw new Error('Er is iets misgegaan bij het verwijderen van het evenement.');
        }
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Er is iets misgegaan bij het verwijderen van het evenement.');
    }
}

export async function getEventsOfUser() {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/events/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log(response)

        if(!response.ok) {
            throw new Error('Er is iets misgegaan bij het zoeken naar evenementen.');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de gegevens.');
    }
}