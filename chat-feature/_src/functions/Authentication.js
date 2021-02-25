import { firebase } from '../firebase/config';
import { Account } from './Class' //CLASS OBJECTS 

//SEND ALERTS TO ERROR TEXT ON LOGIN OR SIGN UP PAGE
//LOGIN - RETURN USER OBJECT OR ERROR MESSAGE 
export function login(email, password) {
    console.log("Logging In...");
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection('ACCOUNTS')
        usersRef
            .doc(uid)
            .get()
            .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
                alert("User does not exist.")
                return;
            }
            const user = firestoreDocument.data();
            console.log(user);
            return user;
        })
            .catch(error => {
            alert(error);
            return null;
        });
    })
        .catch(error => {
        alert(error);
        return null;
    })
}

//PASSWORD MTACH
export function passwordCorrect(email, passwordEntered) {
    //GET CORRECT PASSWORD BASED ON EMAIL ENTRY
    //    'No user exists'
    //    return false;
    //    else
    //   return passwordEntered == userPassword;
    //    
}


//CREATE PROFILE, ADD TO FB
//CREATE ACCOUNT WITH PROF REF
//RETURN {ACCOUNT: account, PROFILE: profile}
function addUser() {
    
    //
    //ADD USER TO ACCOUNTS DB
    const user = firebase.auth().currentUser;
    const ACCOUNTS = firebase.firestore().collection('ACCOUNTS');
    ACCOUNTS
        .doc(user.uid)
        .set(new Account(user.name, user.email, user.uid));
}

//SIGN UP
//RETURN ERROR FOR DISPLAY OR USER FOR LOGIN
export async function signup(email, password, confirmPassword) {
    var r = 0;
    if(passwordMatch(password, confirmPassword)){
        console.log("Signing Up...");
        //CREATE USER - UNIQUE EMAIL, 6 CHAR PASS
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {

            //GENERATE USER ID
            const uid = response.user.uid

            //CREATE NEW ACCOUNT
            const account = new Account("New User", email, uid); 

            //ADD TO ACCOUNTS DB
            const usersRef = firebase.firestore().collection('ACCOUNTS');
            
            usersRef
                .doc(uid)
                .set(account.get())
                .then(() => {
                return {user: account};
            })
                .catch((error) => {
                alert(error);
                console.log(error);
            });
        })
            .catch((error) => {
            alert(error);
            console.log(error);
        });
    }
    else {
        return "Passwords do not match";
    }
}

export function passwordMatch(password, confirmPassword) {
    if (password != confirmPassword) {alert("Paswords do not match"); return false;}
    return true;
}

//CHECK FRO EXISTING EMAIL
//SIGN OUT
export function signOut() {
    console.log("Signing out...");
    return (firebase.auth().signOut());
}



export function GoogleSignIn(){
    
}

//FACCESS CURRENT USER DETAIL - firebase.auth().currentUser