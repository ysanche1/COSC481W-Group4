import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');

export function FormInput({ labelName }) {
    return (
        <TextInput
        label={labelName}
        style={styles.input}
        numberOfLines={1}
        />
    );
}
export function FormButton({ title, modeValue,  ...rest }) {
    return (
        <Button
        mode={modeValue}
        {...rest}
        style={styles.button}
        contentStyle={styles.buttonContainer}
        >
        <Text style = {{color: 'white'}}>{title}</Text>

        </Button>
    );
}
export function FormButtonText({ title, modeValue }) {
    return (
        <Button
        mode='text'
        style={styles.txt}
        contentStyle={styles.buttonContainer}
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
    txt: {
        marginTop: 10, 

    }
});