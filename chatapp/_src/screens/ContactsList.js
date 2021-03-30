import React from 'react';
import { Dimensions, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import { List, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');


//export default function ContactList({route}) {
//    const {fillconv} = (route.params == null) ? false : route.params;
export default function ContactList({fillconv}) {
    
    
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
//PROFILE -> OTHER USER PROFILE
//ROW HOLDING CONTACT DATA
function ContactListing({name, uid, img, fillconv}){
    const navigation = useNavigation();
//        console.log(navigation); //CURRENT ROUTE: CONTACTS

    const handlePress = () => {
        console.log("Profile for user " + uid + " open - " + name);
        
        
        navigation.navigate('ContactProfile', {
            name: name, 
            uid: uid, 
            img: img, 
            thisUser: false,  
        });
    }
    return (
        <List.Item
        title={name}
        titleNumberOfLines={1}
        titleStyle={styles.name}
        style = {styles.item}
        right = {() => (fillconv === true) ? <Text>Add/Remove</Text> : <></> 
}
    left = {() => <Image src = {img} style = {styles.profIMG}/>
}
    onPress = {() => handlePress()}
    />
    );
}

const styles = StyleSheet.create({
    container: {
        //width: {width},        
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
                                    borderTopWidth: 1,
                                        borderTopColor: 'lightgrey',
                            }, 
                                name: {
                                    fontSize: 15,
                                        color: 'black',

                                },
                                    profIMG: {
                                        width: 30, 
                                            height: 30, 
                                                borderRadius: 15, 
                                                    borderWidth: 1, 
                                                        borderColor: 'lightgrey', 
                                                            backgroundColor: 'lightgrey'
                                    }
});


