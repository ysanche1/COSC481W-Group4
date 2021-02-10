import React from 'react';

import { TouchableOpacity } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import IOSIcon from "react-native-vector-icons/Ionicons";


import ChatRoomScreen from '../Zscreens/ChatRoomScreen';
import ConversationScreen from '../Zscreens/ConversationScreen';
import ProfileScreen from '../Zscreens/ProfileScreen';
import ContactsList from '../Zscreens/ContactsList';

import { MenuButton } from '../Zcomponents/Buttons';


//PROFILE SCREEN WITH HEADER
export function ProfileStack({props}) {
    console.log("Profile Stack");

    const ProfStack = createStackNavigator();

    return ( 
        <ProfStack.Navigator
        initialRouteName = 'Profile'
        screenOptions={{
        headerStyle: {
        backgroundColor: 'black', 
        },
        headerLeft: () => (<MenuButton/>)}}>
                           <ProfStack.Screen 
                           name = 'ProfileScreen' 
                           options= {{
                           title: '',
                           headerTitleStyle: {
                           fontSize: 22, 
                           color: 'white',
                           }
                           }}
                           component = {ProfileScreen}/>
    </ProfStack.Navigator>
    )
}

export function ContactStack() {
    const ContactStack = createStackNavigator();
    return ( 
        <ContactStack.Navigator
        initialRouteName = 'Contacts'
        screenOptions={{
        headerStyle: {
        backgroundColor: 'black', 
        }, 
        headerTitleStyle: {
                           fontSize: 22, 
                           color: 'white',
                           }, 
        headerTintColor: 'white', 
        }}>
        
        
        <ContactStack.Screen name = 'Contacts' options= {{
        title: 'Contacts', headerLeft: () => (<MenuButton/>)}}>
        {(props) => <ContactsList fillconv = {false}/>}
        </ContactStack.Screen>
    
        <ContactStack.Screen name = 'ContactProfile' options = {{title: ''}}>
        {(props) => <ProfileScreen {...props}/>}
        </ContactStack.Screen>
            
    </ContactStack.Navigator>
    )
}

export function ConversationStack() {
    const ConvStack = createStackNavigator();

    return (
        <ConvStack.Navigator 
        initialRouteName='Conversations'
        screenOptions={{
        headerStyle: {
        backgroundColor: 'black'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
        fontSize: 22, 
        }
        }}>

        <ConvStack.Screen name = 'Conversations' 
        component= {ConversationScreen}
        options = {({ navigation }) => ({
        headerLeft: () => (<MenuButton/>)})}/>

       <ConvStack.Screen 
        name = 'ChatRoom' component = {ChatRoomScreen}
        options = {
        ({ route }) => ({
        title: route.params.roomtitle,
        })}
        />

        </ConvStack.Navigator>
        );
}


//alignSelf: 'center',