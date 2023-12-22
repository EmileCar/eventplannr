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
                name="DashboardScreen"
                component={Dashboard}
                options={{
                    title: `Dashboard`,
                    headerShown: false
                }} 
            />
            <DashboardStack.Screen
                name="EventDetailNavigatorDashboard"
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
                name="SearchEventsScreen" 
                component={SearchEvents} 
            />
        </DashboardStack.Navigator>
    );
};
