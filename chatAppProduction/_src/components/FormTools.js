import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');

export function FormInput({ labelName, value, onChangeText, ...rest }) {
    return (
        <TextInput
        label={labelName}
        style={styles.input}        
        numberOfLines={1}
        {...rest }
        />
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


const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
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