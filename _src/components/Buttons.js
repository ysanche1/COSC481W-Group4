import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, View, Text } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');

export function MenuButton() {
    const navigation = useNavigation();
    return (<TouchableOpacity 
        onPress={() => navigation.openDrawer()}>
    <IOSIcon name="ios-menu" style = {{marginLeft: 10, color: 'white'}} size={30} />
            </TouchableOpacity>
           );
}

const bar_width = .8 * width;
export function ProfileButton({title, onPress}) {
    return (
        <TouchableOpacity style = {styles.container} 
        onPress = {onPress}>
        <Text style = {styles.txt}>{title}</Text>
         <View style = {styles.div}/> 
        </TouchableOpacity>

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
        fontSize: 15,
        padding: 20,
        letterSpacing: 1.5,
    }

});