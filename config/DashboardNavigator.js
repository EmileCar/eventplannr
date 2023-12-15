import React from 'react';
import EventDetail from '../screens/EventDetail';
import Dashboard from '../screens/Dashboard';
import SearchEvents from '../screens/SearchEvents';
import { DashboardStack } from './AppNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventDetailNavigator } from './EventDetailNavigator';


export const DashboardNavigator = () => {
    const DashboardStack = createNativeStackNavigator();

    return (
        <DashboardStack.Navigator>
            <DashboardStack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false
                }} 
            />
            <DashboardStack.Screen
                name="EventDetailNavigator"
                component={EventDetailNavigator}
                options={{
                headerShown: false,
                }}
            />
            <DashboardStack.Screen
                options={() => ({
                    title: `Search Events`,
                })}
                name="SearchEvents" 
                component={SearchEvents} 
            />
        </DashboardStack.Navigator>
    );
};
