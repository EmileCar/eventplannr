import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/Settings';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import EventDetail from '../screens/EventDetail';
import UserEvents from '../screens/UserEvents';
import Dashboard from '../screens/Dashboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/Profile';
import { TouchableOpacity } from 'react-native';
import themeStyle from '../styles/theme.style';
import AddEvent from '../screens/AddEvent';
import AddLocation from '../screens/AddLocation';
import SearchEvents from '../screens/SearchEvents';


// ROOT NAVIGATOR
const RootStack = createNativeStackNavigator();
export const RootNavigator = () => {
  return (
    <NavigationContainer>
        <RootStack.Navigator>
            <RootStack.Screen name="Tabs" component={TabNavigator} options={{headerShown : false}}/>
            <RootStack.Screen name="Settings" component={Settings} />
        </RootStack.Navigator>
    </NavigationContainer>
  );
};

// BOTTOM TAB NAVIGATOR
const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
    const navigation = useNavigation();

    useEffect(() => {
        console.log(navigation)
        // Add a listener for the tab press event
        const unsubscribe = navigation.addListener('tabPress', (e) => {
          // e.preventDefault(); // Uncomment this line to prevent default tab behavior
            console.log(e.route.name)
          // Check if the tab being pressed is the "User Events" tab
          if (e.route.name === 'UserEvents') {
            // Execute the refresh action here
            // For example, you can dispatch an action or call a refresh function
            console.log('User Events tab pressed. Refreshing...');
          }
        });
    
        // Clean up the listener when the component is unmounted
        return unsubscribe;
      }, [navigation]);

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
                <Ionicons name="person" color={color} size={size} />
                ),
                title: 'Your Events',
                headerRight: () => (
                    <TouchableOpacity
                        style={{ marginRight: 16 }}
                        onPress={() => navigation.navigate('AddEvent')} // Navigate to the screen where you add an event
                    >
                    <Ionicons name="add" size={24} color={themeStyle.COLOR_WHITE} />
                    </TouchableOpacity>
                ),
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

// DASHBOARD NAVIGATOR
const DashboardStack = createNativeStackNavigator();

export const DashboardNavigator = () => {
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
            options={({ route }) => ({
                title: `Event Detail`,
              })} 
              name="EventDetail" component={EventDetail} />
            <DashboardStack.Screen
            options={({ route }) => ({
                title: `Search Events`,
              })} 
              name="SearchEvents" component={SearchEvents} />
        </DashboardStack.Navigator>
    );    
}

// USER EVENTS NAVIGATOR
const UserEventsStack = createNativeStackNavigator();
const UserEventsNavigator = () => {
    const route = useRoute();
    console.log(route)
    return (
        <UserEventsStack.Navigator
            screenOptions={{
                headerShown: route.name === "AddEvent" ? false : true,
              }
            }
        >
            <UserEventsStack.Screen
                name="UserEvents"
                component={UserEvents}
                options={{ 
                    headerShown: false
                }}
            />
            <UserEventsStack.Screen
            options={({ route }) => ({
                title: `Event Detail`,
                
              })} 
              name="EventDetail" component={EventDetail} />
            <UserEventsStack.Screen
                options={({ route }) => ({
                title: 'Add Event',
              })} 
              name="AddEvent" component={AddEvent} />
            <UserEventsStack.Screen
            options={({ route }) => ({
                title: `Add Location`,
                
              })} 
              name="AddLocation" component={AddLocation} />
        </UserEventsStack.Navigator>
    );
}