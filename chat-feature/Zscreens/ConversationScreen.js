import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormButton from '../Zcomponents/FormButton';


export default function HomeScreen({navigation}) {
    return (
    
    <View style = {styles.container}>
        <Title style={styles.title}>Conversations</Title>
        <FormButton
        modeValue='contained'
        title='Go to Room'
        onPress={() => navigation.navigate('ChatRoom')}
      />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
    title:{
    color: 'black'
    }
});