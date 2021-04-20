// LOGINSCREEEN.JS
// THIS FILE CONTAINS COMPONENTS FOR AND FUNCTIONS FOR INTERACTION WITH THE LOG IN SCREEN.
// MORAGN IVERSON 

/************* NODE MODULES *************/
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Title, TextInput } from 'react-native-paper';

/************* LOACL COMPONENTS/FUNCTIONS *************/
import { FormButton, FormButtonText } from '../components/Buttons';
import { login } from '../functions/Authentication';
import { AuthContext } from '../navigation/AuthProvider'

/************* CONSTANTS *************/
const { width, height } = Dimensions.get('screen');

/************* LOGIN SCREEN COMPONENT *************/
export default function LoginScreen({ navigation }) {
    const { user } = useContext(AuthContext); //GET CURRENT USER AND ALL DATA
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //WHAT TO DO WHEN LOGIN BUTTON PRESSED
    const handleLogin = async() => {
        const RES = await login(email, password);
        if(RES != null) setError(RES);
    }
    
    return (
        <View style = {styles.container}>
        <Title style={styles.titleText}>Welcome to Chat app</Title>
        
        <Text style = {{color: 'red', maxWidth: "70%"}}> { error } </Text>

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
        onPress={() => {handleLogin()}}
        />
            <FormButtonText
        title='New user? Join here'
        style = {styles.navButtonText}
        onPress={() => navigation.navigate("SignUp")}
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