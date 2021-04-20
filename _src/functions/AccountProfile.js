// ACCOUNTPROFILE.JS
// THIS FILE CONTAINS FUNCTIONS FOR USER ACCOUNT AND PROFILE MANAGEMENT INCLUDING, GETTING/EDITING PROFILE DATA AND GETTING ACCOUNT DATA SUCH AS CONTACTS AND CONVERSATIONS.
// MORGAN IVERSON

/************* NODE MODULES *************/
import { firebase } from '../firebase/config';

/************* LOCAL  COMPONENTS *************/
import { Account, Profile, Message, Conversation } from './Class' //CLASS OBJECTS 

/************* CONSTANTS *************/
export const VIEW = 0, SEARCH = 1, MINE = 2;


/****************** PROFILE MANAGEMENT FUNCTIONS *********************/
//GET CURRENT USER PROFILE DATA 
export function getUserProfile(){
    const p = [];
    var profile = {};

    const UID = firebase.auth().currentUser.uid;
    console.log(UID);

    p.push(firebase.firestore().collection('ACCOUNTS')
           .doc(UID)
           .get()
           .then((d) => {
        if(d.exists) profile = d.data().PROFILE;
        else console.log("This document does not exist.");
    })
           .catch((e) => {console.log(e);})
          );

    return Promise.all(p)
        .then(() => {
        console.log(profile);
        return profile;
    });
}

export async function editProfile(img, bio) {
    return await firebase.firestore()
        .collection("ACCOUNTS")
        .doc(firebase.auth().currentUser.uid)
    .update({
        "PROFILE.IMG": img, 
        "PROFILE.BIO": bio, 
                 }
    );
        
}


/****************** CONTACTS MANAGEMENT FIUNCTIONS *********************/

//RETURNS CONTACT LISTING DATA OBJECT 
function getContactDetails(UID, index) {
    var profile = {};
    const p = [];


    p.push(firebase.firestore()
           .collection("ACCOUNTS")
           .doc(UID)
           .get()
           .then((d) => {
        if(d.exists) { 
            //            console.log(d.data().PROFILE); 
            profile = d.data().PROFILE;
        }
        else console.log("This document does not exist.");
    })
           .catch((e) => {console.log(e);})
          );

    return Promise.all(p)
        .then(() => {
        //        console.log("Profile: ", profile);
        var P = { 
            value: profile.FNAME + " " + profile.LNAME, 
            key: UID, 
            img: profile.IMG, 
            bio: profile.BIO, 
        };
        //        console.log(P);
        return P;
    });


}

//RETURN USER CONTCTS AS ARRAY OF CONTACT LISTING DATA OBJECTS 
export function getContacts() {
    const p = [];
    const detailPromises = [];
    var document = {};
    var contacts = [];

    const UID = firebase.auth().currentUser.uid;
    console.log(UID);


    p.push(firebase.firestore().collection('ACCOUNTS')
           .doc(UID)
           .get()
           .then(async (d) => {
        if(d.exists) {

            contacts = d.data().CONTACTS;
            //            console.log("FB User Contacts: ", contacts); //LIST OF UID

            contacts.map((item, index) => {
                detailPromises.push(getContactDetails(item, index));
            });

            //            return detailPromises;
            contacts = await Promise.all(detailPromises)
                .then((r) => {
                //                console.log("Details: ", r);
                return r;
            })

        }
        else console.log("This document does not exist.");
    })
           .catch((e) => {console.log(e);}))


    return Promise.all(p)
        .then((r) => {
        //        console.log(contacts);
        return contacts;
    })
}

//RETURN LIST OF ALL USER ACCOUNTS THAT ARE NOT CURRENT FRIENDS
export async function getUsers() {
    var users = [];
    const snapshot = await  firebase.firestore().collection('ACCOUNTS').get();
    snapshot.docs.map((d) => {
        var data = d.data();
//        console.log(data);
        users.push({value: data.PROFILE.FNAME + " " + data.PROFILE.LNAME, 
                    email: data.EMAIL, 
                    key: data.UID, 
                    bio: data.PROFILE.BIO, 

                    img: data.PROFILE.IMG});
    });
    
    const currentAccount = await firebase.firestore().collection("ACCOUNTS").doc(firebase.auth().currentUser.uid).get().then(d => d.data());
    
//    console.log("CURRENT ACCOUNT: ", currentAccount);
    console.log("CONTACTS: ", currentAccount.CONTACTS);
    console.log("ALL USERS: ", users);

    users = users.filter((item) => { 
        return currentAccount.CONTACTS.indexOf(item.key) < 0 && item.key != currentAccount.UID;
    });
    console.log("NON-CONTACT USERS: ", users);
    
    console.log(users.sort((a, b) => { return a.value.substring(a.value.indexOf(" ") + 1) - b.value.substring(a.value.indexOf(" ") + 1);}));


    return users.sort((a, b) => { return a.value - b.value;});
}
//ADDS UID TO CURRENT USERS CONTACTS ARRY IN FIRESTORE
export async function addNewContact(UID) {
    await firebase.firestore().collection("ACCOUNTS").doc(firebase.auth().currentUser.uid)
        .update({
        CONTACTS: firebase.firestore.FieldValue.arrayUnion(UID),
    });
}


/****************** ACCOUNT *********************/

//RETURN CURRENT USER ACCOUNT OBJECT/DOCUMENT DATA
export async function getCurrentUserAccount() {
    const p = [];
    var a = {};

    const UID = firebase.auth().currentUser.uid;
    console.log(UID);

    p.push(firebase.firestore().collection('ACCOUNTS')
           .doc(UID)
           .get()
           .then((d) => {
        if(d.exists) a = d;
        else console.log("This document does not exist.");
    })
           .catch((e) => {console.log(e);})
          );

    return await Promise.all(p)
        .then(() => {
        console.log(a.data());
        return a.data();
    });
}

//GET CURRENT USER FIREBASE AUTHENTICATIONS METADATA
export async function getDateCreated() {
    return await firebase.auth().currentUser.metadata.creationTime;
}

