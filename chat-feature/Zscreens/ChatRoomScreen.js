import React, {useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
//https://amanhimself.dev/blog/chat-app-with-react-native-part-1/
//https://amanhimself.dev/blog/chat-app-with-react-native-part-4/

//ROOM SCREEN COMPONENT
//STATES: MESSAGES
export default function RoomScreen({navigation}) {
    //MESSAGES
    const [messages, setMessages] = useState([
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
        setMessages(GiftedChat.append(messages,newMessage));
    }
    
    return (
        <GiftedChat messages = {messages}
        onSend = {newMessage => handleSend(newMessage)}
        user = { {_id: 1}}
        />
);   
}