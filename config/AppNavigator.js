import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/Settings';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/Profile';
import { TouchableOpacity } from 'react-native';
import themeStyle from '../styles/theme.style';
import { DashboardNavigator } from './DashboardNavigator';
import { UserEventsNavigator } from './UserEventsNavigator';


// ROOT NAVIGATOR
const RootStack = createNativeStackNavigator();
export const RootNavigator = () => {
  return (
    <NavigationContainer>
        <RootStack.Navigator>
            <RootStack.Screen name="Tabs" component={TabNavigator} options={{headerShown : false}}/>
            {/* <RootStack.Screen name="Settings" component={Settings} /> */}
        </RootStack.Navigator>
    </NavigationContainer>
  );
};

// BOTTOM TAB NAVIGATOR
const BottomTab = createBottomTabNavigator();
const TabNavigator = () => {
    const navigation = useNavigation();

    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: themeStyle.COLOR_BLACK,
                tabBarInactiveTintColor: themeStyle.COLOR_INACTIVE, 
                headerStyle: {
                backgroundColor: themeStyle.COLOR_PRIMARY, 
                },
                headerTintColor: themeStyle.COLOR_WHITE, 
            }}
        >
            <BottomTab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                    <Ionicons name="list" color={color} size={size} />
                    ),
                }}
                name="Dashboard"
                component={DashboardNavigator}
            />
            <BottomTab.Screen
            options={{
                tabBarLabel: 'User Events',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />),
                headerShown: false,
            }}
            name="UserEvents"
            component={UserEventsNavigator}
            />
            <BottomTab.Screen
            options={{
                tabBarLabel: 'Mijn profiel',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
                ),
            }}
            name="Profile"
            component={Profile}
            />
        </BottomTab.Navigator>
    );
}
