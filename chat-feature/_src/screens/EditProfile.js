import { firebase } from '../firebase/config';
import React, { useContext } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider'
//import { checkPassword, updateProfile } from '../functions/AccountProfile';


export default function EditProfileScreen{
    const user = useContext(AuthContext);

    const [first, setFirst] = useState('');

    const checkPassword = () => {
        //FIREBASE DOCUMENTS auth()
    }

    const updateProfile = (UID, first) => {
        firebase.firestore().collection("PROFILES")
            .doc(user.uid)
            .update({
            FIRST: first, 
        })
    }

    const handleSubmit = () => {
        if(checkPassword(UID, password)) {
            updateProfile(UID, first);
        }
        else {
            alert("Error");
        }
    }

    return (

    )
}
