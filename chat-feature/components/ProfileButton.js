import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
const { width, height } = Dimensions.get('screen');
const bar_width = .8 * width;

//chatbubble, chatbubbles, Entypo/edit or materialCommunityIcons/account-edit
export default function ProfileButton({title, onPress}) {
    return (
        <View style = {styles.container} onPress = {onPress}>
        <Text style = {styles.txt}>{title}</Text>
         <View style = {styles.div}/> 

        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center', 
    },
    div: {
        borderBottomColor: 'black',
        borderBottomWidth: 1, 
        width: bar_width,    
    }, 
    txt: {
        fontSize: 12,
        padding: 20,
    }

});