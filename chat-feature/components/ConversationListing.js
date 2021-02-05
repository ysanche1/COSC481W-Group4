import React, { Title } from 'react';
const { width, height } = Dimensions.get('screen');
import { Dimensions, FlatList, View, StyleSheet, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';


export default function ConversationListing({roomtitle, lastmessage, time, sid}){
    function handlePress() {
        //FILL CHAT ROOM WITH MESSAGES WITH RELATED SID
        //OPEN CHATROOM
        console.log("SESSION: " + sid + "Entered")
        //ADD NAVIGATION -> Chatroom after loaded
    }
    console.log(lastmessage);
    return (
        <List.Item
            title={roomtitle}
            description= {lastmessage}
            titleNumberOfLines={1}
            titleStyle={styles.title}
            descriptionStyle={styles.description}
            descriptionNumberOfLines={1}
            style = {styles.item}
            right = {props => <Text style = {styles.time}>{time}</Text>
            }
            />
    );
}
const styles = StyleSheet.create({
    item: {
        color: 'black', 
        borderTopWidth: '1px',
        borderTopColor: 'lightgrey',
    },
    time: {
        color: 'grey',
    }, 
    description: {
        color: 'grey',
        fontSize: 15,
    },
    title: {
    fontSize: 20,
    color: 'black',
    
}
});

//REMOVE TOP BORDER OF FIRST CHILD OF FLAT LIST
//const estyles = Estylesheet.create({
//item:{
//    color: 'black', 
//        borderTopWidth: '1px', 
//            borderTopColor: 'lightgrey', 
//}, 
//    'item:first-child': {
//        borderTopWidth: 0,
//    }
//
//    });

