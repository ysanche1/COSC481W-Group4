import { firebase } from '../firebase/config';
import React, { useContext } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider'
//import { checkPassword, updateProfile } from '../functions/AccountProfile';


export default function EditProfileScreen{
    const user = useContext(AuthContext);

    const [error, setError] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');

    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState({});



    const checkPassword = () => {

        //FIREBASE DOCUMENTS auth()

        // GOOGLE FIREBASE DOCUMENTS -- https://firebase.google.com/docs/auth/android/manage-users#get_a_users_provider-specific_profile_information

        // Get auth credentials from the user for re-authentication. The example below shows
        // email and password credentials but there are multiple possible providers,
        // such as GoogleAuthProvider or FacebookAuthProvider.
        AuthCredential credential = EmailAuthProvider
            .getCredential(user.email, "password1234");

        // Prompt the user to re-provide their sign-in credentials
        user.reauthenticate(credential)
            .addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
                        Log.d(TAG, "User re-authenticated.");
                }
    });
}

const getImage() = {
    //REACT NATIVE IMAGE PICKER -> https://github.com/react-native-image-picker/react-native-image-picker

}


//SEND UPDATED INFORMATION TO FB
const updateProfile = (UID, first) => {
    firebase.firestore().collection("ACCOUNTS")
        .doc(user.uid)
        .update({
        PROFILE: {FIRST: first,
                  LAST: last, 
                  BIO: bio, 
                 }
    });
}

//GET PROFLE DATA STORED IN FB
const getProfile = () => {
    firebase.firestore().collection("ACCOUNTS")
        .doc(user.uid)
        .get()
        .then((d) => {
        setProfile(d.data().PROFILE);
    })
}

const handleSubmit = () => {
    if(checkPassword(UID, password)) {
        updateProfile(UID, first);
    }
    else {
        setError("Incorrect Password")
    }
}

return (
    <View>

    <Text style = {{color: 'red'}}> { error } </Text>

    <TextInput
    label = 'First'
    style = {  }
    numberOfLines= {1}
    value = { first }
    autoCapitalize='none'
    onChangeText= { (input) => { setEmail(input)} }
/>

<View>

    )
}


