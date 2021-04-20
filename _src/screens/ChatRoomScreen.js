//CHATROOMSCREEN.JS
// THIS FILE CONTAINS COMPONENTS FOR AND FUNCTIONS FOR INTERACTION WITH THE CHAT ROOM SCREEN.
//MORGAN IVERSON

/************* NODE MODULES *************/
import React, { useState, useEffect, useContext,  } from 'react';
import { GiftedChat} from 'react-native-gifted-chat';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useNavigation, NavigationActions } from '@react-navigation/native';
import IOSIcon from "react-native-vector-icons/Ionicons";

/************* LOCAL COMPONENTS/FUNCTIONS *************/
import { AuthContext } from '../navigation/AuthProvider'; //CURRENT USER 
import { checkMessages, getMessages, storeMessage, readMessages } from '../functions/Communication';
import { getCurrentUserAccount } from '../functions/AccountProfile';

/************* CHAT ROOM SCREEN COMPONENT *************/
export default function ChatRoomScreen({route, navigation}) {
    const { user } = useContext(AuthContext);    
    const {roomtitle, CID} = route.params;
    const [messages, setMessages] = useState([]); //MESSAGES
    const [text, setText] = useState('');

    //SET HEADER ROW 
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                onPress={() => navigation.navigate("ChatMenu", 
                                                   {CID: CID, 
                                                    roomtitle: roomtitle})}>
                              <IOSIcon name="ios-menu" style = {{marginRight: 10, color: 'white'}} size={30} />
                              </TouchableOpacity>
                             )}
                             )
}, [navigation]);    

//LPAD MESSAGES STORED IN FIREBASE
useEffect(() => {
    getMessages(CID).then((m) => {
        //                        console.log(m);
        //            setMessages(m);
        handleSend(m, true);
    }) 
}, []);

//LISTEN FOR CHANGES TO MESSAGE ARRAY ** 3/25
useEffect(() => {
    checkMessages(CID, messages.length, handleSend);

}, []);

//ON CHNAGE OF MESSAGES SET UNREAD MESSAGES TO FALSE FOR CURRENT USER
useEffect(() => {
    console.log("MESSAGE CHANGE");
    //SET UNREAD MESSAGES TO FALSE
    readMessages(CID);
}, [ messages ])

//ADDS NEW MESSAGE TO PREVIOUS MESSAGES AND POSTS
const handleSend = (newMessage = [], stored) => {
    //        console.log(newMessage);

    //SEND MESSAGES TO FIRESTORE
    if(!stored) storeMessage(CID, newMessage[0]);

    //STORE MESSAGE() -> BOOL -> POST
    setMessages(GiftedChat.append(messages, newMessage));
}


return (
    <View style={{backgroundColor: 'white', flex: 1}}>
    <GiftedChat
    renderAvatar = {null}
    renderUsernameOnMessage = {true}
    messages = { messages }
    onSend = {newMessage => handleSend(newMessage, false)}
user = { {_id: user.uid, 
       }}
       />
</View>
);   
}
