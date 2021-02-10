import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';

import FormInput from '../Zcomponents/FormInput';
import FormButton from '../Zcomponents/FormButton';

import { AuthContext } from '../Znavigation/AuthProvider'

export default function SignUpScreen({ navigation }) {
      const { register } = useContext(AuthContext); //GET REGISTER FUNCTION

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    

//    const handlePasswordChange => (input) => {
//         password = (input.length >= 8) ? input : '';
//        setPassword(password);
//    }
//    
//    const handleEmailChange => (input) = {
//         email = (input.length >= 8) ? input : '';
//        setEmail(email);
//    }
    const formComplete = () => {return (email != '' && password != '')}
  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Register to chat</Title>
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText= {uemail => setEmail(uemail)}
      />
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={upass => setPassword(upass)}
      />
      <FormButton
        title='Signup'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        disabled = {formComplete ? true : false}
        onPress = {() => register(email, password)}
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
  }
});
