import React from 'react';
//import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, FlatList, View, StyleSheet, Text } from 'react-native';
import { List, Divider, Title } from 'react-native-paper';

import ContactListing from '../Zcomponents/ContactListing';

const { width, height } = Dimensions.get('screen');


export default function ContactList({route}) {
    
    const {fillconv} = (route.params == null) ? false : route.params;

    //    appendSessions() {}
    //FILLE THIS WITH USER CONTACTS
    const CONTACTS = [
        {
            id: 1,
            name: "John Doe", 
            uid: '12345'
        }, 
        {
            id: 2,
            name: "Jane Doe", 
            uid: '12346'        
        },
    ]

    //GENERATE VISUAL FROM ITEM
    const RenderItem = ({ item }) => {
        return (<ContactListing 
                name={item.name}
                fillconv = {fillconv}
                lastmessage = {item.lastmessage}
                uid = {item.uid}/>
               );
    }

    return (
        <View style = {styles.container}>
        <FlatList
        style = {styles.list}
        data = {CONTACTS}
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


