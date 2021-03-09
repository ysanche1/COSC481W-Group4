//CONVERSATION LIST<>CHATROOM
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

//IMPORT SCREENS
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

//CREATE STACK INSTANCE - return 2 components: Screen, Navigator
const Stack = createStackNavigator();

//Navigator: holds screens
//Props: 
//initialrouteName (which screen should show first load), 
//headerMode (show header or not) https://reactnavigation.org/docs/stack-navigator/#headermode (float, screen, none)
//Screen: specify screens
//Props: name (screen name on header) component (js component)

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Login' headerMode='none'>
        <Stack.Screen name = 'Login' component= {LoginScreen}/>
        <Stack.Screen name = 'SignUp' component= {SignUpScreen}/>
        </Stack.Navigator>
);
}