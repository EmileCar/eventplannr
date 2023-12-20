import React, { useContext } from 'react';
import EventDetail from '../screens/EventDetail';
import Dashboard from '../screens/Dashboard';
import SearchEvents from '../screens/SearchEvents';
import { DashboardStack } from './AppNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventDetailNavigator } from './EventDetailNavigator';
import { ThemeContext } from '../contexts/ThemeContext';


export const DashboardNavigator = () => {
    const DashboardStack = createNativeStackNavigator();
    const { theme } = useContext(ThemeContext)
    
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
                    headerStyle: {
                        backgroundColor: theme.COLOR_HEADER,
                    },
                    headerTintColor: theme.COLOR_TEXT_WHITE,
                })}
                name="SearchEvents" 
                component={SearchEvents} 
            />
        </DashboardStack.Navigator>
    );
};
