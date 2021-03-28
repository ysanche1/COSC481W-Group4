import React, { useContext, useState, useEffect } from 'react';
//import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, FlatList, View, StyleSheet, Text } from 'react-native';
import { List, Divider, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthProvider';

import { firebase } from '../firebase/config';
import { getConversations, addConversation } from '../functions/AccountProfile';

const { width, height } = Dimensions.get('screen');

export default function ConversationScreen({navigation}) {
    const [newConv, setNewConv] = useState(false);
    //    appendSessions() {}
    //FILLE THIS WITH CONVERSATIONS
//    console.log(firebase.auth().currentUser);
    const {user} = useContext(AuthContext);
    const [listings, setListings] = useState([]);
   
    
    //LOAD CONVERSATIONS ON EVENT
    const loadConversations = () => {
        getConversations().then((listings) => {
            setListings(listings);
        });
    }
    //LOAD CONVERSATIONS ON FIRST RENDER
    useEffect(() => {
        getConversations().then((listings) => {
            setListings(listings);
        })
    });
    
//    console.log(listings);

    //GENERATE VISUAL FROM ITEM
    const RenderItem = ({ item }) => {
        return (<ConversationListing 
                roomtitle={item.title} 
                lastmessage = {item.lastmessage}
                time = {item.time}
                CID = {item.CID}/>
               );
    }

    return (
        <View style = {styles.container}>
        <FlatList
        style = {styles.list}
        data = {listings}
        renderItem = {RenderItem} 
        keyExtractor = {item => item.id.toString()}
/>
    </View>
);
}

//LINE OF CONVERSATION TO BE LISTED IN SCREEN
function ConversationListing({roomtitle, lastmessage, time, CID}){
    const navigation = useNavigation();
    
    function handlePress() {
        //FILL CHAT ROOM WITH MESSAGES WITH RELATED SID
        navigation.navigate('ChatRoom', { 
                roomtitle: roomtitle,
                CID: CID ,
            }); //OPEN CHATROOM

        console.log(roomtitle);
        console.log("SESSION: " + CID + " Entered");
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
        onPress = {() => handlePress(CID)}
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
        borderBottomWidth: '1px',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: '1px',
        borderBottomColor: 'lightgrey',
    },
    time: {
        color: 'grey',
    }, 
    description: {
        color: 'grey',
        fontSize: 12,
        marginTop: 10,
    },
    name: {
    fontSize: 20,
    color: 'black',
    
}
});


