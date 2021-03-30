import { firebase } from '../firebase/config';
import { Account, Profile, Message, Conversation } from './Class' //CLASS OBJECTS 


//FUNCTIONS FOR ACCOUNT AND PROFILE MANAGEMENT


async function getConversation(CID) {
    var CONV = null;
    console.log(CID);
    
    
    firebase.firestore().collection("CONVERSATIONS").doc(CID)
        .get()
        .then( (d) => {
        if(d.exists) {
            console.log(d.data());
            return d.data()
        } 
        else console.log("Error: This document does not exist")})
        .catch( (e) => {console.log("Error: " + e)})
}
//LOAD CONVERSATIONS

//CONVERT FIREBASE CONVERSATION OBJECT TO CONVERSATION LISTING
async function getItemListing(item, index) {
    var conversation;
    //---------- GET CONVERSATION DATA

    var conversation = await firebase.firestore().collection("CONVERSATIONS").doc(item).get()
    .then( (d) => {
        if(d.exists) {return d.data();} 
        else console.log("Error: This document does not exist")
    });

    //    console.log(conversation);
    //----------GET CONVERSATION DATA FROM FB -------------
    const CID = conversation.CID;
    //    console.log(CID);

    var i = {
        id: index + 1, 
        title: (conversation.USERS.length == 2 ? conversation.USERS.find((uid) => {uid != currentUID}) : "Group Name"),
        lastmessage: conversation.MESSAGES[conversation.MESSAGES.length - 1].TEXTCONTENT,
        time: conversation.MESSAGES[conversation.MESSAGES.length - 1].TIME,
        CID: conversation.CID,
        LASTEDIT: conversation.MESSAGES[conversation.MESSAGES.length - 1].CREATEDAT,
    };
//        console.log(i);
    return i;
}

export async function getConversations() {

    // ------- GET ARRAY OF CURRENT ACCOUNTS CONVERSATIONS ------
    const currentUID = firebase.auth().currentUser.uid;

    const currentAccount = firebase.firestore().collection("ACCOUNTS").doc(firebase.auth().currentUser.uid);

    //---------- GET USER CONVERSATIONS ---------
    var CONVERSATIONS = await currentAccount.get()
    .then((d) => {
        if(d.exists) {
            return d.data().CONVERSATIONS;
        }
        else console.log("Error: Document does not exist")});
//    console.log(CONVERSATIONS);


    //------------ CONVER CONVERSATIONS OBJ TO LISTING OBJ
    var Listings = [];
    var array = [];

    return Promise.all(
        CONVERSATIONS.map(async(item, index) => {
        var l = await getItemListing(item, index);
        //        console.log(l);
        item = l;
        Listings.push(l);
    }))
        .then (() => {return Listings.sort((a, b) => {return b.LASTEDIT - a.LASTEDIT})});
    //
    //    console.log(Listings);
    //    return Listings;
}


//PROFILE
export function getUserProfile(){
    const p = [];
    var profile = {};

    const UID = firebase.auth().currentUser.uid;
    console.log(UID);

    p.push(firebase.firestore().collection('PROFILES')
           .doc(UID)
           .get()
           .then((d) => {
        if(d.exists) profile = d;
        else console.log("This document does not exist.");
    })
           .catch((e) => {console.log(e);})
          );

    return Promise.all(p)
        .then(() => {
        console.log(profile.data());
        return profile.data();
    });
}


function getContactDetails(UID, index) {
    var profile = {};
    const p = [];
    
    p.push(firebase.firestore().collection("PROFILE")
        .doc(UID)
        .get()
        .then((d) => {
            if(d.exists) profile = d.data();
            else console.log("This document does not exist.");
        })
        .catch((e) => {console.log(e);})
           )
    return Promise.all(p)
    .then(() => {
        return { 
               value: profile.name, 
               key: UID, 
            IMG: profile.IMG
               }
    });
    
    
}

//CONTACT LIST
export function getContacts() {
    const p = [];
    var document = {};
    var contacts = [];

    const UID = firebase.auth().currentUser.uid;
    console.log(UID);

    p.push(
        firebase.firestore().collection('ACCOUNTS')
        .doc(UID)
        .get()
        .then((d) => {
            if(d.exists) document = d;
            else console.log("This document does not exist.");
        })
        .catch((e) => {console.log(e);})
    )
    
    
    return Promise.all(p)
    .then(() => {
        contacts = document.data().CONTACTS;
        console.log(contacts); //LIST OF UID
        return (contacts == null ? [] : contacts.map((item, index) => {
            return getContactDetails(item, index);}))
    })
}





