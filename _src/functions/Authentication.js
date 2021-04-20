//AUTHENTICATION.JS
// THIS FILE CONTAINS FUNCTIONS FOR USER AUTHENTICATION TO FACILITATE LOGIN, SIGN UP, SIGN OUT AND ACCOUNT/PROFILE CREATION.
//BEN BRUURSEMA AND MORGAN IVERSON

/************* NODE MODULES *************/
import { firebase } from '../firebase/config';

/************* LOCAL  COMPONENTS *************/
import { Account, Profile, Conversation, getCurrentDateTime, Message } from './Class' //CLASS OBJECTS 

/**************** SIGN UP FUNCTIONS *****************/
//CHECK FOR ERRORS, CREATE ACCOUNT AND PROFIEL OBJ ADD TO DB, LOG IN
export function signup(first, last, email, password, confirmPassword) {
    var ERROR = false;
    var MESSAGE = '';
    const p = [];
    const PR = passwordRules(password, confirmPassword);

    //FORM COMPLETE TEST
    if(first == '' || last == '' || email == '' || password == '' || confirmPassword == ''){
        console.log('CMP');
        ERROR = true;
        MESSAGE = 'Please complete all parts of Sign Up';
    }
    //PASSWORDS MATCH TEST
    else if(!PR.state){
        console.log('PM');
        ERROR = !PR.state;
        MESSAGE = PR.message;
    }
    else{
        console.log("Signing Up...");
        //CREATE USER - UNIQUE EMAIL, 6 CHAR PASS
        p.push(firebase
               .auth()
               .createUserWithEmailAndPassword(email, password)
               .then((r) => {

            //CREATE NEW ACCOUNT
            const account = new Account(email, r.user.uid, [], ((new Profile(first, last, null, 0)).toFirestore())); 

            //ADD NEW ACCOUNT AND PORFILE TO COLLECTION
            const userAdded = addUser(account);
            console.log(userAdded);
        })
               .catch((e) => {
            ERROR = true;
            MESSAGE = e.message;
            //DELETE CURRENT USER - IF ERROR
           var user = firebase.auth().currentUser;
            if(user != null) user.delete()
        })
              )

        return Promise.all(p).then( () => {
            return (ERROR ? MESSAGE : null);
        });
    }
    return (ERROR ? MESSAGE : null);
}

//ADD USER ACCOUNT/PROFILE TO FB DATABASE
function addUser(account) {
    console.log("Adding Account...");
    console.log(account.UID);
    const p = [];
    var SUCCESS = true;

    //ADD TO ACCOUNTS DB
    firebase.firestore().collection('ACCOUNTS')
        .doc(account.UID)
        .set(account.toFirestore())
        .then(() => {
            console.log("ADDED");
        })
        .catch((e) => {
            //alert(e);
            console.log(e);
            SUCCESS = false;
            return e;
        })

    return SUCCESS;
}

//CHECK PASSWORD RULES FOR SIGN UP
export function passwordRules(password, confirmPassword) {
    //1: PASSWORD LENGTH (password.length >= #)
    //2: MATCH (password)
    return {state: password == confirmPassword && password != '', message: 'Passwords do not match' };
}

/**************** LOG IN FUNCTIONS  *****************/
//CHECK FOR ERRORS, LOG IN USER 
export function login(email, password) {
    var ERROR = false;
    var MESSAGE = '';
    console.log("Logging In...");
    const p = [];
    var USER = null;

    p.push(firebase
           .auth()
           .signInWithEmailAndPassword(email, password)
           .catch(e => {
        MESSAGE += e.message;
        ERROR = true;
    })
          );

    return Promise.all(p).then(() => {
        console.log(ERROR);
        console.log(MESSAGE);
        console.log(USER);
        return (ERROR ? MESSAGE : USER);
    });
}

/**************** SIGN OUT FUNCTIONS *****************/
export function signOut() {
    console.log("Signing out...");
    return (firebase.auth().signOut());
}
