// SCREENSTACKS.JS
// THIS FILE CONTAINS ALL THE STACKS FOR SIGNED UP USERS TO ACCESS WHEN THEY ARE LOGGED IN. 
// MORGAN IVERSON

/************* NODE MODULES *************/
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import IOSIcon from "react-native-vector-icons/Ionicons";

/************* SCREENS *************/
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ConversationScreen from '../screens/ConversationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactsList from '../screens/ContactsList';
import NewChatScreen from '../screens/NewChatScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountDetailScreen from '../screens/AccountDetailScreen';
import EditProfileScreen from '../screens/EditProfile';
import ChatMenuScreen from '../screens/ChatMenuScreen';

/************* LOCAL  COMPONENTS *************/
import { MenuButton, AddConversationButton } from '../components/Buttons';
import { MINE } from '../functions/AccountProfile';


/************* STACKS *************/

//YOUR PROFILE NAVIGATION STAKC (YOUR PROFILE, EDIT PROFILE, ACCOUNT DETAILS VIEW)
export function ProfileStack({props}) {
    console.log("Profile Stack");

    const ProfStack = createStackNavigator();

    return ( 
        <ProfStack.Navigator
        initialRouteName = 'Edit'
        screenOptions={{
        headerStyle: {
        backgroundColor: 'black', 
        },
        headerTitleStyle: {
        fontSize: 22, 
        color: 'white',
        }, 
        headerTintColor: 'white', 
        }
        }>
        <ProfStack.Screen 
        name = 'ProfileScreen' 
        options= {({route}) => ({
        title: '',
        headerTitleStyle: {
            fontSize: 22, 
            color: 'white',
        }, 
        WHICH: MINE,
    })}
component = {ProfileScreen}/>
    <ProfStack.Screen 
name = 'Details' 
options= {({route}) => {}}
component = {AccountDetailScreen}/>
    <ProfStack.Screen 
name = 'Edit' 
options= {({route}) => {}}
component = {EditProfileScreen}/>
    </ProfStack.Navigator>
)
}

//CONTACTS LIST STAKC (CONTACTS LIST, PROFILE)
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

//CONVERSATION STACK (CONVERSATIONS LISTING, CHATROOM SCREEN, CHAT MENU, PROFILE, NEW CHAT SCREEN)
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
        headerLeft: () => (<MenuButton/>),
                           headerRight: () => (<AddConversationButton/>)   })}/>

        <ConvStack.Screen name = 'NewChat' component = { NewChatScreen }
                                        options = {
                                        ({ route }) => ({ title: "New Chat",})}
        />

<ConvStack.Screen name = 'ChatRoom' component = {ChatRoomScreen}
options = {
    ({ route }) => ({title: route.params.roomtitle,})}
    />

<ConvStack.Screen name = 'ChatMenu' component= { ChatMenuScreen }/>
    <ConvStack.Screen name = 'Profile' component= { ProfileScreen }/>
        </ConvStack.Navigator>
);
}

//SERACH STACK (SERACH SCREEN, PROFILE SCREEN)
export function SearchStack() {
    const SStack = createStackNavigator();

    return (
        <SStack.Navigator 
        initialRouteName='Search'
        screenOptions={{
        headerStyle: {
        backgroundColor: 'black'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
        fontSize: 22, 
        }
        }}>

        <SStack.Screen name = 'Search' 
        component= {SearchScreen}
        options = {({ navigation }) => ({
        headerLeft: () => (<MenuButton/>),

                           })}/>

                                        <SStack.Screen 
                                        name = 'SearchProfile' 
                                        options= {{
                                        title: '',
                                        headerTitleStyle: {
                                        fontSize: 22, 
                                        color: 'white',
                                        }
                                        }}
                                        component = {ProfileScreen}/>
                                        </SStack.Navigator>     

                                       );}
