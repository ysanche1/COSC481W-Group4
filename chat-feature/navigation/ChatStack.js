//CONVERSATION LIST<>CHATROOM
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

//IMPORT SCREENS
import ChatRoomScreen from '../Zscreens/ChatRoomScreen';
import ConversationScreen from '../Zscreens/ConversationScreen';

//CREATE STACK INSTANCE - return 2 components: Screen, Navigator
const Stack = createStackNavigator();

//Navigator: holds screens
//Props: 
//initialrouteName (which screen should show first load), 
//headerMode (show header or not) https://reactnavigation.org/docs/stack-navigator/#headermode (float, screen, none)
//Screen: specify screens
//Props: name (screen name on header) component (js component)

export default function HomeStack() {
    return (
        <Stack.Navigator 
        initialRouteName='Conversations'
        screenOptions={{
        headerStyle: {
        backgroundColor: 'black'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
        fontSize: 22
        }
        }}>

        <Stack.Screen name = 'Conversations' 
        component= {ConversationScreen}
        options = {({ navigation }) => ({
        headerRight: () => (
            <IconButton
            icon='message-plus'
            size={28}
            color = 'white'
            onPress = { () => navigation.navigate('')} />
                                       )}
                                       )} 
/>
    <Stack.Screen name = 'ChatRoom' component= {ChatRoomScreen}/>
        </Stack.Navigator>
);
}