import React from 'react';
//import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, FlatList, View, StyleSheet, Text } from 'react-native';
import { List, Divider, Title } from 'react-native-paper';

import ConversationListing from '../Zcomponents/ConversationListing';

const { width, height } = Dimensions.get('screen');


export default function ConversationScreen({navigation}) {
    //    appendSessions() {}
    //FILLE THIS WITH CONVERSATIONS
    const CONV = [
        {
            id: 1,
            title: "Room 1", 
            lastmessage: "Hey!",
            time: "00:00pm"
        }, 
        {
            id: 2,
            title: "Room 2", 
            lastmessage: "hi",
            time: "00:00pm"
        },
    ]

    //GENERATE VISUAL FROM ITEM
    const RenderItem = ({ item }) => {
        console.log(item);
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
    }
});


