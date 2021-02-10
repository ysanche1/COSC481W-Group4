import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

import FormInput from '../Zcomponents/FormInput';
import FormButton from '../Zcomponents/FormButton';
import FormButtonText from '../Zcomponents/FormButtonText';
//https://amanhimself.dev/blog/chat-app-with-react-native-part-1/

import { AuthContext } from '../Znavigation/AuthProvider'


export default function LoginScreen({ navigation }) {
      const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style = {styles.container}>
        <Title style={styles.titleText}>Welcome to Chat app</Title>
        <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={userEmail => setEmail(userEmail)}
/>
    <FormInput
labelName='Password'
value={password}
secureTextEntry={true}
onChangeText={userPassword => setPassword(userPassword)}
/>
    <FormButton
title='Login'
modeValue='contained'
labelStyle={styles.loginButtonLabel}
onPress={() => login(email, password)}
/>
    <FormButtonText
title='New user? Join here'
modeValue='text'
uppercase={false}
labelStyle={styles.navButtonText}
onPress={() => navigation.navigate("SignUp")}
/>
    </View>

);
}


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
        color: 'black', 
    },
    loginButtonLabel: {
        fontSize: 20
    },
    navButtonText: {
        fontSize: 15, 
    },
    navButton: {
        marginTop: 10
    }
});