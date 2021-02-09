import React, { Title } from 'react';
const { width, height } = Dimensions.get('screen');
import { Dimensions, FlatList, View, StyleSheet, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


//LINE OF CONVERSATION TO BE LISTED IN SCREEN
export default function ConversationListing({roomtitle, lastmessage, time, sid}){
    const navigation = useNavigation();
    function handlePress() {
        //FILL CHAT ROOM WITH MESSAGES WITH RELATED SID
        navigation.navigate('ChatRoom'); //OPEN CHATROOM

        console.log("SESSION: " + sid + " Entered");
        //ADD NAVIGATION -> Chatroom after loaded
    }
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
        onPress = {() => handlePress()}
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

