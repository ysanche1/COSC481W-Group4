import React, { Title } from 'react';
const { width, height } = Dimensions.get('screen');
import { Dimensions, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



//LINE OF CONVERSATION TO BE LISTED IN SCREEN
export default function ContactListing({name, uid, img, fillconv}){
    const navigation = useNavigation();

    const ProfileIMG = () =>{
        return <Image src = {img} style = {styles.profIMG}/>
    }

        const handlePress = () => {
            console.log("Profile for user " + uid + " open.");

            navigation.navigate('Profile', {
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
            titleStyle={styles.title}
            style = {styles.item}
            right = {() => (fillconv === true) ? <Text>Add/Remove</Text> : <></> 
    }
        left = {() => <ProfileIMG img = {img}/>
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
            title: {
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


