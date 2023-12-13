import AsyncStorage from '@react-native-async-storage/async-storage';
import environment from '../environment.json';

const API_BASE_URL = environment.apiBaseUrlDevelopment;

export async function changeAttendanceStatus(eventId, status) {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/attendance/${eventId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                attendanceStatus: status,
            }),
        });

        if(!response.ok) {
            const error = await response.json();
            console.log(error)
            if(error.message){
                throw new Error(error.message);
            }
            throw new Error('Er is iets misgegaan bij het zetten van de aanwezigheidstatus.');
        }
        return response;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function getAttendanceStatus(eventId) {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/attendance/${eventId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            if (error.message) {
                throw new Error(error.message);
            }
            throw new Error('Er is iets misgegaan bij het ophalen van de aanwezigheidstatus.');
        }

        const attendanceStatus = await response.json();
        return attendanceStatus;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}