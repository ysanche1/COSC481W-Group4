import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');

import { FormInput, FormButton, FormButtonText } from '../components/FormTools';

import { login } from '../functions/Authentication';
import { AuthContext } from '../navigation/AuthProvider'


export default function LoginScreen({ navigation }) {
    const { user } = useContext(AuthContext); //GET CURRENT USER AND ALL DATA
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

//    console.log(user); //SHOULD BE NULL
    
    const handleLogin = () => {
        const user = login(email, password);
        if(user != null) navigation.navigate('Home', { user });
    }
    
    
    return (
        <View style = {styles.container}>
        <Title style={styles.titleText}>Welcome to Chat app</Title>
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
        secureTextEntry = { true }
        autoCapitalize='none'
        onChangeText= { (input) => { setPassword(input)} }
        />
            <FormButton
        title='Login'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        onPress={() => login(email, password)}
        />
            <FormButtonText
        title='New user? Join here'
        style = {styles.navButtonText}
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
        fontSize: 10, 
    },
    navButton: {
        marginTop: 10
    }, 
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
    }
});