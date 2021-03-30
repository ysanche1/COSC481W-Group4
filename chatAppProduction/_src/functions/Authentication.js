import { firebase } from '../firebase/config';
import { Account, Profile, Conversation, getCurrentDateTime, addMessagesA, Message } from './Class' //CLASS OBJECTS 

let DefaultConversation = new Conversation(null, 
                                           null, 
                                           [new Message(null, /* SET CID ON CREATION*/ 
                                                        "SYSTEM", /* SYSTEM MESSAGE */ 
                                                        "createdAt", /* SET CREATED AT TIMESTAMP ON CREATION*/ 
                                                        null, /* GET TIME ON CREATION */
                                                        "Welcome! You have just created a new account on [Chat App]!")]);

const DefaultContacts = {}; //UID FOR MY ACCOUNT

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

export function passwordCorrect(email, passwordEntered) {
    //GET CORRECT PASSWORD BASED ON EMAIL ENTRY
    //    'No user exists'
    //    return false;
    //    else
    //   return passwordEntered == userPassword;
    //    
}

function addUser(account, profile) {
    const p = [];

    //ADD TO ACCOUNTS DB
    const usersRef = firebase.firestore().collection('ACCOUNTS')
    p.push(
        usersRef
        .doc(uid)
        .set(account.get())
        .then(() => {

        })
        .catch((e) => {
            //alert(e);
            console.log(e);
            return e;
        })
    );

        //ADD TO PROFILE DB

    const profRef = firebase.firestore().collection('PROFILES');
    p.push(
        profRef
        .doc(uid)
        .set(profile.get())
        .catch((e) => {
            //alert(e); 
            console.log(e);
            return e;
        })
    )
    
    return Promise.all(p).then((r) => {
        console.log(r);
        return r;
    })

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
            const account = new Account("New User", email, uid, []); 

            //CREATE PROFILE
            const profile = new Profile("First", "Last", null, 0);
            
            //ADD NEW ACCOUNT AND PORFILE TO COLLECTION
            const usedAdded = addUser(account, profile);
            console.log(userAdded);
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



//FACCESS CURRENT USER DETAIL - firebase.auth().currentUser