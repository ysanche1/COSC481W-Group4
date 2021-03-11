import React, { useContext } from 'react';
import { Title } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';

import { ProfileButton } from '../components/Buttons';
import { AuthContext } from '../navigation/AuthProvider';

import { signOut } from '../functions/Authentication';


//export default function ProfileScreen({route}) {
export default function ProfileScreen({ route }) {
        const {user} = useContext(AuthContext);
    console.log(user.email);
//    console.log(route.params);
    
    const {name, uid, img, thisUser} = (route.params == null) ? {name: 'Your Name', uid: 'UID', img: '', thisUser: true} : route.params;

    
    console.log((thisUser ? "Your ": name + " ") + "Profile Screen");

    const OtherProfile = () => {
        return (
            <ScrollView contentContainerStyle = {{flex:1}}> 
            <View style = {styles.container}>

            <Image src = {img} style = {styles.IMG}/>
            <Text style = {styles.name}>{name}</Text>

            <View style = {styles.buttonCont}>
            <ProfileButton title = 'New Chat' icon = 'chat'/> 
            <ProfileButton title = 'New Group' icon = 'gchat'/> 
            </View>

            </View>

            </ScrollView>
        );
    }
    const UserProfile = () => {
        return (
            <ScrollView contentContainerStyle = {{flex:1}}> 
            <View style = {styles.container}>

            <Image src = {img} style = {styles.IMG}/>
            <Text style = {styles.name}>Your name</Text>

            <View style = {styles.buttonCont}>
            <ProfileButton title = 'Edit Profile'/> 
            <ProfileButton title = 'Edit Account'/> 
            <ProfileButton title = 'Sign Out' onPress = {() => signOut()}/> 

            </View>
            </View>
            </ScrollView>
        );
    }

    return (
        (thisUser ? <UserProfile/> : <OtherProfile/>)
        );
         }

         const styles = StyleSheet.create({
         IMG: {
            width: 150, 
            height: 150, 

            borderRadius: 75, 
            borderWidth: 1, 
            borderColor: 'lightgrey', 
            backgroundColor: 'lightgrey',

            marginBottom: 20,
        }, 
         container: {
         marginTop: 30,
         alignItems: 'center', 
         flex: 1, },

         name: {
         fontSize: 30, 
         marginBottom: 100,
         color: 'black',
         }

         });