import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

import { View, StyleSheet, FlatList } from 'react-native';
import { List, Divider } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

const messagesFDB = 'MESSAGES';
//https://amanhimself.dev/blog/chat-app-with-react-native-part-1/
//https://amanhimself.dev/blog/chat-app-with-react-native-part-4/

//ROOM SCREEN COMPONENT
//STATES: MESSAGES
export default function RoomScreen({navigation, SID}) {
    //PULL MESSAGES FROM FIRESTORE
        const storedMessages = firestore()
        .collection(messagesFDB)
        .doc(SID)
        .get();
        //MATCH CURRENT USER ID MATCH IS _id:1
//        setMessages(storedMessages);
              
    //MESSAGES
    const [messages, setMessages] = useState([
        
        //LOAD MESSAGES FROM SESSION
        
        //MOCK MESSAGES
        
        //SYSTEM MESSAGE
        {
            _id: 0, 
            text: 'New room created.', 
            createdAt: new Date().getTime(), 
            system:true
            //ANY OTHER CUSTOMS
        },
        //CHAT MESSAGE
        {
            _id:1, 
            text: 'Hello', 
            createdAt: new Date().getTime(), 
            user: {
                _id: 2, 
                name: 'Test User', 
                avatar:''
            },
            image: '', 
            video: '', 
            sent: false, //MARK AS
            received: false, //MARK AS
            //ANY OTHER CUSTOMS
        }
        
    ]);
    
    //HELPER FUNCTION: ADDS NEW MESSAGE TO PREVIOUS MESSAGES AND POSTS
    function handleSend(newMessage = []){
        //SEND MESSAGES TO FIRESTORE
//        newMessage.sid = ''; //SESSION ID
//        newMessage.uid = ''; //USER ID
//        firestore().collection(messagesFDB).add(newMessage);
        
        setMessages(GiftedChat.append(messages, newMessage));
    }
    
    return (
        <GiftedChat messages = {messages}
        onSend = {newMessage => handleSend(newMessage)}
        user = { {_id: 1}}
        />
);   
}