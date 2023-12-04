import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import EventDetail from '../screens/EventDetail';
import UserEvents from '../screens/UserEvents';
import Dashboard from '../screens/Dashboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/Profile';
import { TouchableOpacity } from 'react-native';
import themeStyle from '../styles/theme.style';


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
                        onPress={() => navigation.navigate('Test')} // Navigate to the screen where you add an event
                    >
                    <Ionicons name="add" size={24} color="black" />
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
                title: `${route.params.user.name.first} ${route.params.user.name.last}`,
              })} 
              name="EventDetail" component={EventDetail} />
        </DashboardStack.Navigator>
    );    
}

// USER EVENTS NAVIGATOR
const UserEventsStack = createNativeStackNavigator();
const UserEventsNavigator = () => {
    return (
        <UserEventsStack.Navigator>
            <UserEventsStack.Screen
                name="UserEvents"
                component={UserEvents}
                options={{ 
                    headerShown: false
                }}
            />
            <UserEventsStack.Screen
            options={({ route }) => ({
                title: `${route.params.user.name.first} ${route.params.user.name.last}`,
                
              })} 
              name="EventDetail" component={EventDetail} />
        </UserEventsStack.Navigator>
    );    
}

// const FeedStack = createNativeStackNavigator();
// export const FeedNavigator = () => {
//     return (
//         <FeedStack.Navigator>
//             <FeedStack.Screen
//                 name="Feed"
//                 component={Feed}
//                 options={{ 
//                     headerShown: false 
//                 }}
//             />
//             <FeedStack.Screen
//             options={({ route }) => ({
//                 title: `${route.params.user.name.first} ${route.params.user.name.last}`,
//               })} 
//               name="UserDetail" component={UserDetail} />
//         </FeedStack.Navigator>
//     );    
// }

