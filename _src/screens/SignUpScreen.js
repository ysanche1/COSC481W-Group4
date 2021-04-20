// SIGNUPSCREEN.JS
// THIS FILE CONTAINS COMPONENTS FOR AND FUNCTIONS FOR INTERACTION WITH THE SIGN UP SCREEN.
// MORGAN IVERSON

/************* NODE MODULES *************/
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Title, IconButton, Button, TextInput } from 'react-native-paper';

/************* LOCAL  COMPONENTS *************/
import { FormButton } from '../components/Buttons';
import { signup } from '../functions/Authentication';

/************* CONSTANTS *************/
const { width, height } = Dimensions.get('screen');


export default function SignUpScreen({ navigation }) {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    
    const handleSignUp = async() => {
        
        const RES = await signup(first, last, email, password, confirmPassword);
        console.log(RES);
        if(RES != null) setError(RES);

    }
    
    return (
        <View style={styles.container}>
        <Title style={styles.titleText}>Register to chat</Title>
        
        <Text style = {{color: 'red'}}> { error } </Text>
        
        <TextInput
        label = 'First name'
        style = { styles.input }
        numberOfLines= {1}
        value = { first }
        autoCapitalize='none'
        onChangeText= { (input) => { setFirst(input)} }
        />
    <TextInput
        label = 'Last Name'
        style = { styles.input }
        numberOfLines= {1}
        value = { last }
        autoCapitalize='none'
        onChangeText= { (input) => { setLast(input)} }
        />
        <TextInput
        label = 'Email'
        style = { styles.input }
        numberOfLines= {1}
        value = { email }
        autoCapitalize='none'
        onChangeText= { (input) => { setEmail(input)} }
        />
    <TextInput
        label = 'Password'
        style = { styles.input }
        numberOfLines= {1}
        value = { password }
        secureTextEntry={true}
        autoCapitalize='none'
        onChangeText= { (input) => { setPassword(input)} }
        />
<TextInput
        label = 'Confirm Password'
        style = { styles.input }
        numberOfLines= {1}
        value = { confirmPassword }
        secureTextEntry={true}

        autoCapitalize='none'
        onChangeText= { (input) => { setConfirmPassword(input)} }
        />
            <FormButton
        title='Signup'
        labelStyle={styles.loginButtonLabel}
        onPress = {() => {handleSignUp()}}
        />
            <IconButton
        icon='keyboard-backspace'
        size={30}
        style={styles.navButton}
        color='black'
        onPress={() => navigation.goBack()}
        />
            </View>
        );
}

/************* STYLES *************/
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10, 
        color: 'black'
    },
    loginButtonLabel: {
        fontSize: 22
    },
    navButtonText: {
        fontSize: 18
    },
    navButton: {
        marginTop: 10, 
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
    }
});
