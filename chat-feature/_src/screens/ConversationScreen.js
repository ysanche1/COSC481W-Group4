// CONVERSATION SCREEN
// THIS FILE CONTAINS COMPONENTS FOR AND FUNCTIONS FOR INTERACTION WITH THE CONVERSATION LISTING SCREEN.
// MORGAN IVERSON

/************* NODE MODULES *************/
import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, FlatList, View, StyleSheet, Text } from 'react-native';
import { List, Divider, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthProvider';

/************* LOCAL COMPONENTS/FUNCTIONS *************/
import { firebase } from '../firebase/config';
import { addConversation } from '../functions/AccountProfile';
import { getConversations, getCurrentConversation, checkNewConversation, checkNewMessages, readMessages } from '../functions/Communication';
import { AddConversationButton } from '../components/Buttons';

/************* CONSTANTS *************/
const { width, height } = Dimensions.get('screen');

/************* CONVERSATION SCREEN COMPONENT *************/
export default function ConversationScreen({ navigation }) {
    const { user } = useContext( AuthContext );
    const [listings, setListings] = useState([]);

    /** SHOUDL FILL CONVERSATIONS REPLACE NEED FOR GET COnv **/
    useEffect(() => {
        checkNewConversation(listings, setListings);
        //        console.log(listings);
    }, []);


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

/************* COMPONENT: CONVERSATION LISTINBG ROW *************/
function ConversationListing({roomtitle, lastmessage, time, CID}){
    const navigation = useNavigation();
    const [newMSG, setNewMSG] = useState(false);
    const [lastMessageDisplay, setLastMessage] = useState(lastmessage);
    const [timeDisplay, setTime] = useState(time);


    //BOLD LISTING IF UNREAD MESSAGE OR NEW CONVERSATION- /** TEST 2 DEVICES**/
    useEffect(() => {
        checkNewMessages(CID, lastmessage, (d, UNREADMESSAGES) => {
            //            console.log(d);
            //            console.log(UNREADMESSAGES);
            if(UNREADMESSAGES) {
                setLastMessage(d.MESSAGES[d.MESSAGES.length - 1].TEXTCONTENT);
                setTime(d.MESSAGES[d.MESSAGES.length - 1].TIME);
                setNewMSG(true);
            }
            else {
                setNewMSG(false);
            }
        })
    }, []);

    function handlePress() {
        //SET UNREAD MESSAGES TO FALSE
        readMessages(CID);
        //FILL CHAT ROOM WITH MESSAGES WITH RELATED SID
        navigation.navigate('ChatRoom', { 
            roomtitle: roomtitle,
            CID: CID ,
        }); //OPEN CHATROOM

    }

    return (
        <List.Item
        title={roomtitle}
        description= { lastMessageDisplay }
        titleNumberOfLines={1}
        titleStyle={ newMSG ? styles.boldName : styles.name } /** TEST **/
        descriptionStyle={newMSG ? styles.boldDescription : styles.description}
        descriptionNumberOfLines={1}
        style = {styles.item}
        right = {props => <Text style = {newMSG ? styles.boldTime : styles.time}>{ timeDisplay }</Text>
        }
        onPress = {() => handlePress(CID)}
/>
);
}

/************* STYLES *************/
const styles = StyleSheet.create({
    container: {
        width: {width},        
    }, 
    title:{
        color: 'black'
    }, 
    list: {
        backgroundColor: 'white',
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
    boldTime: {
        color: 'grey',
        fontWeight: 'bold'
    },
    description: {
        color: 'grey',
        fontSize: 12,
        marginTop: 10,
    },
    boldDescription: {
        color: 'grey',
        fontSize: 12,
        marginTop: 10,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 20,
        color: 'black',

    }, 
    boldName: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    }
});