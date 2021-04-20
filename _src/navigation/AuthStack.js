// AUTHSTACK.JS
// THIS FILE FACILITATES THE NAVIGATION ABILITIES FOR TWO SCREENS LOGIN AND SIGN UP. 
// MORGAN IVERSON

/************* NODE MODULES *************/
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

/************* LOCAL COMPONENTS (SCREENS) *************/
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

/************* CONSTANTS *************/
const Stack = createStackNavigator();

/************* AUTHENTICATION STACK *************/
export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Login' headerMode='none'>
        <Stack.Screen name = 'Login' component= {LoginScreen}/>
        <Stack.Screen name = 'SignUp' component= {SignUpScreen}/>
        </Stack.Navigator>
);
}