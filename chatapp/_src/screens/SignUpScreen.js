import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Title, IconButton, Button, TextInput } from 'react-native-paper';

import { FormInput, FormButton } from '../components/FormTools';
import { signup } from '../functions/Authentication';

const { width, height } = Dimensions.get('screen');


export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('Error Messages Here');
    const formComplete = () => {return (email != '' && password != '' && confirmPassword != '')}
    
    const handleSignUp = () => {
        signup(email, password, confirmPassword);
      //PASS ERROR MESSAGE RETURNED FROM SIGN UP TO setError(errorMessage); - ASYNC/AWAIT??
    }
    
    return (
        <View style={styles.container}>
        <Title style={styles.titleText}>Register to chat</Title>
        <Text style = {{color: 'red'}}> { error } </Text>
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


//        SUIG UP BUTTON: disabled = {formComplete ? true : false}

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
