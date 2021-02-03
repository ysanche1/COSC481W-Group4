import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function FormButtonText({ title, modeValue,  ...rest }) {
    return (
        <Button
        mode='text'
        {...rest}
        style={styles.button}
        contentStyle={styles.buttonContainer}
        >
        <Text style = {{color: 'black'}}>{title}</Text>

        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10, 
    },
    buttonContainer: {
        width: width / 2,
        height: height / 15,
    }
});