//COMMUNICATION.JS
// THIS FILE CONTAINS FUNCTIONS FOR USER COMMUNICATION INCLUDING FUNCTIONS THAT GET ALL USER CONVERSATIONS FOR DISPLAY, LOAD MESSAGES OF EACH CONVERSATION FOR VIEWING, STORE CHAT MESSAGES IN FIREBASE, LISTEN FOR NEW MESSAGES SENT IN CONVERSATION, AND OTHERS.
// MORGAN IVERSON

/************* NODE MODULES *************/
import React, { useRef, useState, useContext } from 'react';

/************* LOCAL  COMPONENTS *************/
import { firebase } from '../firebase/config';
import { Account, Profile, Message, Conversation } from './Class' 
import { AuthContext } from '../navigation/AuthProvider';


/********************* CHAT FUNCTIONS ******************/

//CONVERT FB MESSAGE TO GIFTED CHAT MESSAGE
function toReadableMessage(m, u, p) {

    //    console.log("M: ", m);
    //    console.log("U: ", u);
    //    console.log("P: ", p);
    //GET USER DETAILS -> PROFILE
    const i = p.findIndex((t, i) => {
        return m.USER == u[i].UID;
    });
    //    console.log(SENDERINDEX);

    //text: m.TEXTCONTENT, 
    //image: m.IMGCONTENT,

    //    console.log("Profile: ", p[i]);
    //SPLIT CONTENT
    return (i < 0 ? 
            {
        _id: m.MID, 
        createdAt: m.CREATEDAT, 
        text: m.TEXTCONTENT,
        time: m.TIME,
        system: true,} 
            : 
            {
        _id: m.MID, 
        createdAt: m.CREATEDAT,
        text: m.TEXTCONTENT,
        time: m.TIME,
        user: {
            _id: u[i].UID, 
            name: p[i].FNAME + " " + p[i].LNAME,
            avatar: p[i].IMG
        }
    })
}

//GET MESSAGES FROM CONVERSATION DOCUMENT
export async function getMessages(CID) {
    const p = [];

    //ACCOUNTS > UID -> SESSIONS -> SID -> ORDERBY.LIMIT
    //MAKE SURE USER IN A MEMBER IN SESSION

    var {MEMBERS, STOREDMESSAGES} = await firebase.firestore()
    .collection("CONVERSATIONS")
    .doc(CID)
    .get()
    .then((d) => {
        if(d.exists) {
            //            console.log(d.data());
            return {
                MEMBERS: d.data().USERS, 
                STOREDMESSAGES: d.data().MESSAGES
            }; //LIMIT OR LOAD ON DEMAND
        }
        else {
            //ERROR
        }
    });
    //    console.log("Messages: ", STOREDMESSAGES);

    var PROFILES = await Promise.all(MEMBERS.map( (item) => {
        return firebase.firestore().collection("ACCOUNTS")
            .doc(item.UID)
            .get() 
            .then( (d) => {
            if(d.exists) {
                //                        console.log(d.data());
                return d.data().PROFILE
            } 
            else{
                return null;
            }
        })
    })
                                    );
    //TURN USER IDS INTO USER PROFILES
    return Promise.all(p).then(() => {
        //        console.log(MEMBERS);
        //        console.log(STOREDMESSAGES);
        return STOREDMESSAGES.reverse().map((item) => {
            //            console.log("Stored message: ", item);
            return toReadableMessage(item, MEMBERS, PROFILES);
        })
    })
}

//SEND MESSAGE TO FB COLLECTION 
export function storeMessage(CID, GCMSG) {
    //    console.log(GCMSG.createdAt);
    var unsubscribe;
    const M = new Message(GCMSG._id, 
                          firebase.auth().currentUser.uid,
                          getCurrentDateTime().time, 
                          GCMSG.text == null ? '': GCMSG.text, 
                          GCMSG.img == null ? '': GCMSG.img);
    //    
    console.log(M);
    var cdoc = firebase.firestore().collection("CONVERSATIONS")
    .doc(CID); //CONVERSATION DOCUMENT

    //ADD NEW MESSAGE 
    cdoc.update({
        MESSAGES: firebase.firestore.FieldValue.arrayUnion(M.toFirestore()),
        LASTMESSAGE: M.toFirestore(),   
    })
        .then(() => {
        //ADD UNREAD MESSAGES TO OTHER USERS IN CONVERSATION
        console.log("MARK UNREAD");
        cdoc.get()
            .then ((d) => {
            d.data().USERS.map((item) => {
                if(item.UID != firebase.auth().currentUser.uid){
                    //GET USER ACCOUNT
                    var udoc = firebase.firestore()
                    .collection("ACCOUNTS")
                    .doc(item.UID);

                    udoc.get()
                        .then((udata) => {
                        udoc.update({
                            CONVERSATIONS: udata.data().CONVERSATIONS.map(item => {return (item.CID == CID) ? {
                                CID: CID, 
                                UNREADMESSAGES: item.UNREADMESSAGES + 1}: 
                            item;}), //REMOVE CONV
                        })
                            .then(() => {
                            console.log(udata.data().CONVERSATIONS);

                        })
                    })
                }
            })
        })
            .catch((e) => {
            alert(e);
            return false;
        })
    })
}

//CHECK IF ANOTHER MESSAGE HAS BEEN ADD TO FB DB
export async function checkMessages(CID, CURRENTLENGTH, foo) {
    const p = [];
    var M = [];
    var CHANGED = false;

    firebase.firestore()
        .collection("CONVERSATIONS")
        .doc(CID)
        .onSnapshot(async (d) => {
        console.log("SNAPSHOT");
        CHANGED = (CURRENTLENGTH != d.data().MESSAGES.length);
        console.log(CHANGED);
        if(CHANGED) { 
            M = await Promise.all([getMessages(CID)])
                .then((m) => {
                //                console.log(m[0]); 
                return m[0];});
            foo(M, true);
        }

    })
    //    return M;
}

/********************* CONVERSTAION FUNCTIONS ******************/

//GET CURRENT DATE/TIME
function getCurrentDateTime(){
    const d = new Date();
    console.log(d.get)
    return {
        date: (d.getMonth() + 1) + "/" + d.getDate() + "/" +  d.getFullYear(), 
        time: (d.getHours() == 0) ? 12 : (d.getHours() % 13) + ":" + ((d.getMinutes()<10?'0':'') + d.getMinutes() ) + (d.getHours() > 11 ? "pm" : "am")
    };
}

//CREAT NEW CONVERSATION FROM LIST OF UIDS - 3/29 WEEK:: ERRORS, SUCCESS
export async function createConversation(USERS) {
    //    console.log(USERS);
    //-----CREATE SYSTEM MESSAGE----
    var dateTime = getCurrentDateTime();

    //CREATE MESSAGE -- HOW TO CREAT UNIQUE MESSAGE ID
    var initialSystemMessage = new Message("000", "SYSTEM", dateTime.time, "Created at " + dateTime.date + " " + dateTime.time, '');
    var userDetails = [];
    var p = [];


    //GET USER NAMES
    USERS.forEach(
        (item) => {
            console.log(item);
            console.log(CID);

            p.push(firebase.firestore().collection("ACCOUNTS")
                   .doc(item)
                   .get()
                   .then( (d) => {
                if(d.exists) {
                    const uid = d.data().UID;
                    const prof = d.data().PROFILE;

                    console.log("Data:");
                    console.log(prof);
                    userDetails.push({UID: uid, NAME: prof.FNAME + " " + prof.LNAME.charAt(0)});
                }
                else {
                    console.log("Document does not exist");
                }
            })
                  )
        });

    console.log(p);

    const getUserDetails = async() => {
        return await Promise.all(p).then(() => {
            console.log("User Details: ", userDetails);
            return userDetails})
    }
    await getUserDetails().then((r) => {userDetails = r;});

    USERS = userDetails;
    console.log(USERS);
    console.log("Usernames: ", USERS);


    //-----CREATE CONVERSATION-----


    //CREATE NEW CONVERSATION 
    var c =  new Conversation('000',
                              USERS,
                              [initialSystemMessage.toFirestore()], 
                              initialSystemMessage.CREATEDAT);
    //    console.log(c);
    //GET CID
    var CID = null;

    //ADD TO CONVERSATIONS COLLECTION
    return Promise.all([firebase.firestore().collection('CONVERSATIONS')
                        .add(c.toFirestore())
                        .then((doc) => {
                            //----- GET ID -----
                            CID = doc.id;
                            //        console.log("Document ID: " + CID);

                            //----- SET ID ------
                            doc.update( {
                                CID: CID
                            })
                                .catch((e) => {
                                console.log("Error: " + e)
                            })
                        })
                        .then ( () => {
                            //-----ADD CONVERSATION TO USERS-----
                            addConversation(USERS, CID);
                        })
                        .catch((e) => {
                            console.log("Error: " + e)
                        })])
        .then(() => {
        return CID;
    })
}

//ADD CID TO USER CONV ARRAYS
async function addConversation(USERS, CID){

    //CHANGE ACCOUNTS TO PROFILE WHEN PROFILE SET UP
    USERS.forEach((item) => {
        console.log(item.UID);
        console.log(CID);

        /**     var doc = firebase.firestore().collection("ACCOUNTS").doc(item.UID);
            //READ CURRENT DOCUMENT
            doc.get()
                .then( (d) => {
                if(d.exists) {
                    console.log("Data:", d.data())
                }
                else {
                    console.log("Document does not exist");
                }
            })
                .catch( (e) => {console.log("Error: " + e);});
    **/

        //ADD CONVERSATIN ID TO CONV LIST
        firebase.firestore().collection("ACCOUNTS")
            .doc(item.UID)
            .update({
            CONVERSATIONS: firebase.firestore.FieldValue.arrayUnion({
                CID: CID, 
                UNREADMESSAGES: 1}),
        })
            .catch( (e) => {console.log("Error: " + e);})
    });
}

//CONVERSATION LISTING:: RETURN OBJECT FOR FLAT LIST OF CONVERSATION 
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

    var chatName = conversation.USERS.filter(item => item.UID != firebase.auth().currentUser.uid).map(item => item.NAME).join(", ");
    //    console.log(chatName == "" ? "Me": chatName);
    var i = {
        id: index + 1, 
        title: chatName == "" ? "Me": chatName,
        lastmessage: conversation.MESSAGES[conversation.MESSAGES.length - 1].TEXTCONTENT,
        time: conversation.MESSAGES[conversation.MESSAGES.length - 1].TIME,
        CID: conversation.CID,
        LASTEDIT: conversation.MESSAGES[conversation.MESSAGES.length - 1].CREATEDAT,
        UNREADMESSAGES: conversation.UNREADMESSAGES,
    };
    //        console.log(i);
    return i;
}

//CONVERSATION LISTING:: GET CURRENT USER CONVERSATIONS
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
            var l = await getItemListing(item.CID, index);
            //        console.log(l);
            item = l;
            Listings.push(l);
        }))
        .then (() => {
        return Listings
            .sort((a, b) => {
            return b.LASTEDIT - a.LASTEDIT}
                 )});
}

//CONVERSATION MENU:: RETURN LISTING OF CHAT MEBERS IN CONVERSATION
export async function getChatMembers(CID) {
    var chatMembers = await firebase.firestore().collection("CONVERSATIONS")
    .doc(CID)
    .get()
    .then((d) => {
        console.log('MEMBER UIDS: ', d.data().USERS);
        return d.data().USERS;
    });
//    console.log('CHAT MEMBERS: ', chatMembers);

    var contacts = await firebase.firestore()
    .collection("ACCOUNTS")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((d) => d.data().CONTACTS);

//    console.log('USER CONTACTS: ', contacts);

    return await Promise.all(chatMembers.filter((item) => {return item.UID != firebase.auth().currentUser.uid})
    .map(async (item) => {
        const profile = await firebase.firestore()
        .collection("ACCOUNTS")
        .doc(item.UID)
        .get()
        .then((d) => {return d.data().PROFILE});

        console.log("PROFILE: ", profile);
        

        return {
            title: profile.FNAME + " " + profile.LNAME,
            isContact: contacts.indexOf(item.UID) >= 0,
            key: item.UID, 
            img: profile.IMG, 
            bio: profile.BIO,
        }
    }))
        .then((r) => {
//        console.log("MAPPED MEMEBERS: ", r); 
        return r
    });

}

//CONVERSATION LISTING/CHAT:: CHECK IF ANOTHER MESSAGE HAS BEEN ADD TO FB DB
export function checkNewConversation(CURRENTCONVERSATIONS, foo) {
    var NEW = false;
    var C;

    var doc = firebase.firestore()
    .collection("ACCOUNTS")
    .doc(firebase.auth().currentUser.uid)


    doc.onSnapshot(async(d) => {        
        NEW = (d.data().CONVERSATIONS.length != CURRENTCONVERSATIONS.length);
        //        console.log(NEW);
        if(NEW) {
            //IF NOT IN CURRENT LISTING SET NEW TO TRUE
            return Promise.all([getConversations()]).then((R) => {
                C = R[0];
                //                console.log(C);

                C.filter((item) => {
                    //                    console.log("FILTER");
                    //                    console.log(item);
                    //ITEM NOT IN CURRENT LISTING
                    return CURRENTCONVERSATIONS.indexOf(item) < 0;
                })
                    .map((item) => {
                    //                    console.log("MAP");

                    //                    console.log(item);
                    //SET PROP NEW TO TRUE
                    item.NEW = true;
                    //                    console.log(item);
                });
                //                console.log(C);
                foo(C);
            })
        }
        else {
            foo([]);
        }
    });


}

//GET DATA ABOUT CONVERSATION BASED ON CID
export function getCurrentConversation(CID) {
    //NEW MESSAGES - LAST MESSAGE PROP != LAST MESSAGE IN FS
    return Promise.all([firebase.firestore()
                        .collection("CONVERSATIONS")
                        .doc(CID)
                        .get()
                        .then(d => {return d.data()})])
        .then((r) => {
        return r[0];
    })
}

//CHECK IF THERE IS A NEW MESSAGE IN A CONVERSATION
export function checkNewMessages(CID, lastmessage, foo) {
    var udoc = firebase.firestore()
    .collection("ACCOUNTS")
    .doc(firebase.auth().currentUser.uid)

    //    console.log(udoc);

    udoc.onSnapshot(async (u) => {
        //        console.log("SNAPSHOT");
        var C = u.data().CONVERSATIONS.find(c => c.CID == CID);
        console.log(C);

        if(C != null && C.UNREADMESSAGES > 0) {
            var currentConversation = await getCurrentConversation(C.CID);
            foo(currentConversation, true);
        }
        else { foo([], false);}

    })
}

//SET CURRENT USER UNREAD MESSAGES FOR A CONVERSATION TO 0 BASED ON CID
export function readMessages(CID) {
    var udoc = firebase.firestore()
    .collection("ACCOUNTS")
    .doc(firebase.auth().currentUser.uid);

    //    console.log(udoc);

    udoc.get().then((d) => {
        var uConv = d.data().CONVERSATIONS;
        console.log(uConv);
        //UPDATE TO FALSE
        udoc.update({
            CONVERSATIONS: uConv.map((item) => {
                console.log(item);
                return (item.CID == CID) ? {
                    CID: item.CID, 
                    UNREADMESSAGES: 0} : item
            }) //REMOVE CONV
        }).then (() => {
            //            console.log(d.data().CONVERSATIONS)
        })
    })}

