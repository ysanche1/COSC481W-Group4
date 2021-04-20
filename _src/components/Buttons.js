// BUTTONS.JS
// THIS FILE HOLDS ALL THE BUTTON COMPONENTS (PROFILEBUTTON, ADDCONVERSATIONBUTTON, FORMBUTTON/FORMBUTTONTEXT)
// MORGAN IVERSON

/************* NODE MODULES *************/
import React, { useContext } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

/************* LOCAL  COMPONENTS *************/
import { createConversation } from '../functions/Communication';
import { AuthContext } from '../navigation/AuthProvider'; 


/************* CONSTANTS *************/
const { width, height } = Dimensions.get('screen');

/************* BUTTONS *************/
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

export function AddConversationButton({ roomtitle, CID }) {
    const { user } = useContext(AuthContext); 
    const navigation = useNavigation();
//    console.log(navigation);
    
    return (<TouchableOpacity 
            onPress={() =>  {navigation.navigate('NewChat'); //OPEN CHATROOM
}}>
        <MaterialIcon name="chat-bubble" style = {{marginRight: 15, color: 'white'}} size={30} />
            </TouchableOpacity>
);
}

export function FormButton({ title, onPress, ...rest }) {
    return (
        <Button
        mode='contained'
        onPress = { onPress }
        {...rest}
        style={styles.button}
        contentStyle={styles.buttonContainer}
        >
        <Text style = {{color: 'white'}}>{title}</Text>

        </Button>
    );
}

export function FormButtonText({ title, onPress,  ...rest }) {
    return (
        <Button
        mode='text'
        onPress = {onPress}
        contentStyle={styles.txtButton}
        >
        <Text style = {{color: 'black'}}>{title}</Text>

        </Button>
    );
}

/************* STYLES *************/
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
    }, 
     button: {
        marginTop: 10, 
        backgroundColor: 'black',
    },
    buttonContainer: {
        width: width / 2,
        height: height / 15,
    }, 
    txtButton: {
       width: width,
        height: height / 15,
    }

});