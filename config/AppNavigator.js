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


// ROOT NAVIGATOR
const RootStack = createNativeStackNavigator();
export const RootNavigator = () => {
  return (
    <NavigationContainer>
        <RootStack.Navigator>
            <RootStack.Screen name="Tabs" component={TabNavigator} options={{headerShown : false}}/>
            {/* <RootStack.Screen name="Auth" component={AuthNavigator} /> */}
            <RootStack.Screen name="Settings" component={Settings} />
        </RootStack.Navigator>
    </NavigationContainer>
  );
};

// BOTTOM TAB NAVIGATOR
const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                options={{
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
            }}
            name="Your events"
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

