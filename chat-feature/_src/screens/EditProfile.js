import { firebase } from '../firebase/config';
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { Title, IconButton, Button, TextInput } from 'react-native-paper';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
// import PhotoUpload from 'react-native-photo-upload'

import { ProfileButton } from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { getCurrentUserAccount, getContacts, getDateCreated, editProfile } from '../functions/AccountProfile';
import { Input } from 'react-native-elements';


//import { checkPassword, updateProfile } from '../functions/AccountProfile';

const { width, height } = Dimensions.get('screen');
const bar_width = .8 * width;


export default function EditProfileScreen() {
    //    const user = useContext(AuthContext);
    const [error, setError] = useState('');
    const [submit, setSubmit] = useState(false);
    const [usrBio, setUsrBio] = useState('');
    const [usrImg, setUsrImg] = useState('');

    const [bio, setBio] = useState('');
    const [img, setImg] = useState('');
    const [profile, setProfile] = useState({});

    const navigation = useNavigation();

//    const options = {
//        title: 'Edit Profile Photo',
//        storageOptions: {
//            skipBackup: true,
//            path: 'images',
//        },
//    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
        }
                             );
    }, [navigation]);


    const uploadIMG = () => {
        
        //REACT NATIVE IMAGE PICKER -> https://github.com/react-native-image-picker/react-native-image-picker
    console.log(ImagePicker);

//        launchImageLibrary(options, (response) => {
//            console.log('Response = ', response);
//
//            if (response.didCancel) {
//                console.log('User cancelled image picker');
//            } 
//            else if (response.error) {
//                console.log('ImagePicker Error: ', response.error);
//            } 
//            else {
//                const uri = response.uri;
//                setImg(uri);
//            }
//        });
//    
    }
    
    //LOAD USER ACCOUNT DATA AND SET STATES
    const getAccountData = async () => {
        //RETURN ACCOUNT OBJECT
        return await getCurrentUserAccount();
    }

    //UPDATE PROFILE IN FB 
    const handleSubmit = () => {
        if(submit) {
            editProfile((img != "" ? img : usrImg), (bio != "" ? bio : usrBio))
                .then(() => {
                navigation.goBack();
            })
        }
    }

    useEffect(() => {
        setSubmit(bio != "");

    }, [bio, img]);

    useEffect(() => {
        getAccountData()
            .then((a) => {
            //            console.log(a);
            //setAccount(a);
            setUsrBio(a.PROFILE.BIO);
            setUsrImg(a.PROFILE.IMG);

        });

    }, []);



    //SEND UPDATED INFORMATION TO FB
    const updateProfile = () => {
        console.log("IMG: ", img);
//        firebase.firestore().collection("ACCOUNTS")
//            .doc(user.uid)
//            .update({
//            PROFILE: {IMG: img,  
//                      BIO: (bio != "") ? bio: userBio, 
//                     }
//        });
    }

    const SubmitButton = () => {
        return( submit ?  (
            <View>
            <View style = {styles.div}/> 
            <ProfileButton onPress = {handleSubmit} title = 'Submit Changes'/>
            </View>
        )
               : (null));
    }

    return (
        <View style = {styles.container}>
        <View style = {styles.editContainer}> 
        <Text style = {styles.editLabel}> Profile Photo: </Text>

        <Image src = {img} style = {styles.IMG}/>
        </View>

        <View style = {styles.editContainer}> 
        <Text style = {styles.editLabel}> Edit Bio: </Text>

        <Input
        placeholder = {usrBio}
        placeholderTextColor="grey"
        inputContainerStyle = { styles.bioInput }
        autoCapitalize='none'
        onChangeText= { (input) => { setBio(input)} }
/>
    </View>
<SubmitButton/>
    </View>

)}

const styles = StyleSheet.create({
    IMG: {
        width: 200, 
        height: 200, 

        borderRadius: '50%', 
        borderWidth: 1, 
        borderColor: 'lightgrey', 
        backgroundColor: 'lightgrey',

        marginBottom: 20,
    }, 
    container: {
        marginTop: 30,
        alignItems: 'center', 
        flex: 1, 
    },    
    editContainer: {
        alignItems: 'center', 
        width: '90%', 
        marginBottom: 50, 
    }, 
    editLabel: {
        fontSize: 20, 
        fontStyle: 'italic', 
        color: 'black', 
        marginBottom: 15, 
    },
    bioInput: {
        marginBottom: 10,
        width: '80%',
        padding: 10, 
        minHeight: 20, 
        alignSelf: 'center', 
        backgroundColor: '#EDEDED', 
        color: 'black',
        borderBottomWidth: 0,

    },
    div: {
        borderBottomColor: 'black',
        borderBottomWidth: 1, 
        width: bar_width,  
        marginTop: 10, 
        alignSelf: 'center', 
    },
    placeHolder: {
        fontSize: 15, 
        color: 'black', 
    },

});

