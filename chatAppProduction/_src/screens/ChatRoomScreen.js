import React, {useState, useEffect, useContext } from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import { AuthContext } from '../navigation/AuthProvider'; //CURRENT USER 

import { View, StyleSheet, FlatList } from 'react-native';
import { List, Divider } from 'react-native-paper';

import { checkMessages, getMessages, storeMessage } from '../functions/ChatCommunication';
//import firestore from '@react-native-firebase/firestore';

const messagesFDB = 'MESSAGES';
//https://amanhimself.dev/blog/chat-app-with-react-native-part-1/


//ROOM SCREEN COMPONENT
//STATES: MESSAGES
export default function ChatRoomScreen({route, navigation}) {
        const { user } = useContext(AuthContext);
    const {roomtitle, CID} = route.params;
    const [messages, setMessages] = useState([]); //MESSAGES
    const [text, setText] = useState('');
    //load messages on scroll up or only show some messages
    //check for new messages 
    
    useEffect(() => {
        getMessages(CID).then((STOREDMESSAGES) => {
            console.log(STOREDMESSAGES);
            setMessages(STOREDMESSAGES);
        }) 
    }, []);
    
    
    //LISTEN FOR CHANGES TO MESSAGE ARRAY ** 3/25
    useEffect(() => {
        var UPDATE = checkMessages(CID, messages.length);
        if(UPDATE != null) console.log(UPDATE);
         else setMessages(UPDATE);
        //IF UPDATE HAS NEW LISTING SET MESSAGES ELSE LEAVE THE SAME 
    })
    
    //HELPER FUNCTION: ADDS NEW MESSAGE TO PREVIOUS MESSAGES AND POSTS
    const handleSend = (newMessage = []) => {
        console.log(newMessage);
        
        //SEND MESSAGES TO FIRESTORE
        const x = storeMessage(CID, newMessage[0]);
//        console.log(x);
        
        //STORE MESSAGE() -> BOOL -> POST
        setMessages(GiftedChat.append(messages, newMessage));
    }

    return (
        <GiftedChat
        messages = {messages}
        onSend = {newMessage => handleSend(newMessage)}
        user = { {id: user.uid}}
/>
);   
}