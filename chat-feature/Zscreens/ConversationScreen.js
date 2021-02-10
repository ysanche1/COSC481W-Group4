import React from 'react';
//import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, FlatList, View, StyleSheet, Text } from 'react-native';
import { List, Divider, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

export default function ConversationScreen({navigation}) {
    //    appendSessions() {}
    //FILLE THIS WITH CONVERSATIONS
    const CONV = [
        {
            id: 1,
            title: "Room 1", 
            lastmessage: "Hey!",
            time: "00:00pm", 
            sid: '09876'
        }, 
        {
            id: 2,
            title: "Room 2", 
            lastmessage: "hi",
            time: "00:00pm",
            sid: '09875'
        },
    ]

    //GENERATE VISUAL FROM ITEM
    const RenderItem = ({ item }) => {
        return (<ConversationListing 
                roomtitle={item.title} 
                lastmessage = {item.lastmessage}
                time = {item.time}
                sid = {item.sid}/>
               );
    }

    return (
        <View style = {styles.container}>
        <FlatList
        style = {styles.list}
        data = {CONV}
        renderItem = {RenderItem} 
        keyExtractor = {item => item.id.toString()}
/>
    </View>
);
}

//LINE OF CONVERSATION TO BE LISTED IN SCREEN
function ConversationListing({roomtitle, lastmessage, time, sid}){
    const navigation = useNavigation();
    function handlePress() {
        //FILL CHAT ROOM WITH MESSAGES WITH RELATED SID
        navigation.navigate('ChatRoom', { 
                roomtitle: roomtitle,
                sid: sid,
            }); //OPEN CHATROOM

        console.log(roomtitle);
        console.log("SESSION: " + sid + " Entered");
        //ADD NAVIGATION -> Chatroom after loaded
    }
    return (
        <List.Item
            title={roomtitle}
            description= {lastmessage}
            titleNumberOfLines={1}
            titleStyle={styles.name}
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
    container: {
        width: {width},        
    }, 
    title:{
        color: 'black'
    }, 
    list: {
    },
    listTitle: {
        color: 'black',
        fontSize: 22, 
    },
    listDescription: {
        color: 'grey',
        fontSize: 16
    },
    listRight: {
        color: 'grey',
    }, 
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
    name: {
    fontSize: 20,
    color: 'black',
    
}
});


