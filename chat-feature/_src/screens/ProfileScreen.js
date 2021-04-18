import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'; //CURRENT USER USECONTEXT
import { Title } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView, Image } from 'react-native';

import { ProfileButton, MenuButton } from '../components/Buttons';
import { AuthContext } from '../navigation/AuthProvider'; //CURRENT USER 
import { getUserProfile, addNewContact } from '../functions/AccountProfile';
import { signOut } from '../functions/Authentication';
import { useNavigation, NavigationActions } from '@react-navigation/native';

import {VIEW, SEARCH, MINE } from '../functions/AccountProfile'


//export default function ProfileScreen({route}) {
export default function ProfileScreen({ route }) {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [profile, setProfile] = useState({});
    const {name, uid, img, bio, WHICH, goBack} = (route.params == null) ?  {
        name: (profile.FNAME + " " +  profile.LNAME), 
        uid: user.uid, 
        img: '',
        bio: profile.BIO,
        WHICH: MINE, 
    } 
    : route.params;


    //LOAD PROFIEL WHWN NAVIGATION LANDS HERE
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            getUserProfile().then(profile => {
                setProfile(profile);
            });

        });
        return unsubscribe;
    }, [navigation]);

    //ADD MENU BUTTON WHENON YOUR PROFILE
    //    console.log("WHICH: ", WHICH);

    if(WHICH == MINE)
    {
        //        console.log("MENU");
        React.useLayoutEffect(() => {
            navigation.setOptions({
                
                headerLeft: () => (<MenuButton/>)
                                   });
            }, [navigation]);}

                              //FUNCTION TO ADD CONTACT UID TO CONTACT LIST IN FB
        const addContact = () => {
            addNewContact(uid)
                .then(() => {
                navigation.goBack();
            })
        }

        //VIEW ONLY
        const ViewProfile = () => {
            return (
                <ScrollView contentContainerStyle = {{flex:1}}> 
                <View style = {styles.container}>

                <Image src = {img} style = {styles.IMG}/>
                <Text style = {styles.name}>{name}</Text>
                <View style = {styles.bio}><Text style = {styles.biotxt}>"{bio}"</Text></View>

                <View style = {styles.buttonCont}>

                </View>

                </View>

                </ScrollView>
            );
        }
        //ADD CONTACT BUTTON
        const SearchProfile = () => {
            return (
                <ScrollView contentContainerStyle = {{flex:1}}> 
                <View style = {styles.container}>

                <Image src = {img} style = {styles.IMG}/>
                <Text style = {styles.name}>{name}</Text>
                <View style = {styles.bio}><Text style = {styles.biotxt}>"{bio}"</Text></View>


                <View style = {styles.buttonCont}>
                <ProfileButton title = 'Add Contact' onPress = {addContact} /> 

                </View>

                </View>

                </ScrollView>
            );
        }
        //MY PROFILE - EDIT VIEW DETAILS
        const UserProfile = () => {
            return (
                <ScrollView contentContainerStyle = {{flex:1}}> 
                <View style = {styles.container}>

                <TouchableOpacity>
                <Image src = { img } style = {styles.IMG} />
                </TouchableOpacity>

                <Text style = {styles.name}>{ name }</Text>
                <View style = {styles.bio}><Text style = {styles.biotxt}>{ bio }</Text></View>

                <View style = {styles.buttonCont}>
                <ProfileButton  title = 'Edit Profile' onPress = { () => {navigation.navigate('Edit')}}/>  
        <ProfileButton title = 'View Account Details' onPress = { () => {navigation.navigate('Details')}} /> 
    <ProfileButton title = 'Sign Out' onPress = {() => signOut()}/> 

        </View>
    </View>
    </ScrollView>
    );
}

switch(WHICH) {
    case VIEW: return <ViewProfile/>; break;
    case SEARCH: return <SearchProfile/>; break;
    case MINE: return <UserProfile/>; break;
}
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
        marginBottom: 20,
        color: 'black',
    }, 
    bio: {
        backgroundColor: '#EDEDED', 
        minHeight: 50, 
        minWidth: 300,
        maxWidth: 350, 
        marginBottom: 60, 
        padding: 15,
        alignItems: 'center',
    }, 
    biotxt: {
        color: 'grey', 
        fontSize: 12, 
        fontStyle: 'italic',

    }

});