import moment from 'moment';


function loadConversations() {
    //GET USER SESSTION FROM AUTH CONTEXT USER .SESSIONS
    //HOW TO LOAD ON SCROLL
    //ACCOUNTS > UID > SESSIONS
    //RETURN ARRAY OF SESSIONS
    //{C: new Conversation(SID, USERS, TITLE, MESSAGES), LM: MESSAGES[MESSAGES.LENGTH - 1]}
}

import React, { useRef, useState, useContext } from 'react';

import { firebase } from '../firebase/config';
import { Account, Profile, Message, Conversation } from './Class' //CLASS OBJECTS 

function toReadableMessage(m, u, p) {
    //GET USER DETAILS -> PROFILE
    const SENDERINDEX = p.findIndex((t, i) => {
        return m.USER == u[i];
    });
    //    console.log(SENDERINDEX);

    //text: m.TEXTCONTENT, 
    //            image: m.IMGCONTENT,

    //SPLIT CONTENT
    return (SENDERINDEX < 0 ? 
            {
        _id: m.MID, 
        createdAt: m.CREATEDAT, /* moment.js formatting */
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
            id: u[SENDERINDEX], 
            name: p[SENDERINDEX].FirstName + " " + p[SENDERINDEX].LastName,
            avatar: p[SENDERINDEX].IMG
        }
    })
}

//PULL TOP X MESSAGES DOWN FROM FB SESSION
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
            console.log(d.data());
            return {
                MEMBERS: d.data().USERS, 
                STOREDMESSAGES: d.data().MESSAGES
            }; //LIMIT OR LOAD ON DEMAND
        }
        else {
            //ERROR
        }
    });

    var PROFILES = await Promise.all(MEMBERS.map( (item) => {
        return firebase.firestore().collection("PROFILES")
            .doc(item)
            .get() 
            .then( (d) => {
            if(d.exists) {
                //                        console.log(d.data());
                return d.data()
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
        console.log(STOREDMESSAGES);
        return STOREDMESSAGES.reverse().map((item) => {
            //            console.log(item);
            return toReadableMessage(item, MEMBERS, PROFILES);
        })
    })
}
//HIDE CURRENT USER AVATAR ON LOAD
//CORRECT CREATED AT FROMMAT

//SEND MESSAGE TO FB COLLECTION ** 3/25

export function storeMessage(CID, GCMSG) {
    const M = new Message(GCMSG._id, 
                          firebase.auth().currentUser.uid,
                          getCurrentDateTime().time, 
                          GCMSG.text == null ? '': GCMSG.text, 
                          GCMSG.img == null ? '': GCMSG.img);
    //    
    console.log(M);
    return firebase.firestore().collection("CONVERSATIONS")
        .doc(CID)
        .update({
        MESSAGES: firebase.firestore.FieldValue.arrayUnion(M.toFirestore()),
        LASTMESSAGE: M.TEXTCONTENT,
        LASTEDITED: M.CREATEDAT,
    })
        .then(() => {return true;})
        .catch((e) => {
        alert(e);
        return false;
    })
}

//
export  function checkMessages(CID, CURRENTLENGTH) {
    const p = [];
    var CHANGED = false;


    p.push(firebase.firestore()
           .collection("CONVERSATIONS")
           .doc(CID)
           .onSnapshot((d) => {
        CHANGED = (CURRENTLENGTH != d.data().MESSAGES.length);
    }));

    var M = [];
    Promise.all(p)
    .then( () => {
        if(CHANGED) M = [];
        else 
            M = Promise.all([getMessages(CID)])
                .then((m) => {return m;})
        
    });
//    console.log(M);
    return M;
}

//CONVERSTAION
function getCurrentDateTime(){
    const d = new Date();
    return {
        date: (d.getMonth() + 1) + "/" + d.getDate() + "/" +  d.getFullYear(), 
        time: (d.getHours() == 0) ? 12 : (d.getHours() % 13) + ":" + ((d.getMinutes()<10?'0':'') + d.getMinutes() ) + (d.getHours() > 11 ? "pm" : "am")
    };
}

//CREAT NEW CONVERSATION
export function createConversation(USERS) {
    console.log(USERS);
    //-----CREATE SYSTEM MESSAGE----
    var dateTime = getCurrentDateTime();

    //CREATE MESSAGE -- HOW TO CREAT UNIQUE MESSAGE ID
    var initialSystemMessage = new Message("000", 
                                           "SYSTEM", 
                                           dateTime.time, 
                                           "Created at " + dateTime.date + " " + dateTime.time, 
                                           ''
                                          );
    //console.log(initialSystemMessage);

    //-----CREATE CONVERSATION-----
    //CREATE NEW CONVERSATION 
    var c =  new Conversation('000',
                              USERS,
                              [initialSystemMessage.toFirestore()], 
                              initialSystemMessage.CREATEDAT);
    console.log(c);
    //GET CID
    var CID = null;

    //ADD TO CONVERSATIONS COLLECTION
    firebase.firestore().collection('CONVERSATIONS')
        .add(c.toFirestore())
        .then((doc) => {
        //----- GET ID -----
        CID = doc.id;
        console.log("Document ID: " + CID);

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
    });

    return CID;
}

//ADD CID TO USER LISTING
function addConversation(USERS, CID){
    //CHANGE ACCOUNTS TO PROFILE WHEN PROFILE SET UP
    USERS.forEach((item) => {
        console.log(item);
        console.log(CID);

        var doc = firebase.firestore().collection("ACCOUNTS").doc(item);
        //READ CURRENT DOCUMENT
        doc.get()
            .then( (d) => {
            if(d.exists) {
                console.log("Data:");
                console.log(d.data())}
            else {
                console.log("Document does not exist");
            }
        })
            .catch( (e) => {console.log("Error: " + e);});

        //ADD CONVERSATIN ID TO CONV LIST
        firebase.firestore().collection("ACCOUNTS").doc(item).update({
            CONVERSATIONS: firebase.firestore.FieldValue.arrayUnion(CID)
        })
            .then( () => {
            //            console.log(doc.get());
        })
            .catch( (e) => {console.log("Error: " + e);})
    });
}




//var washingtonRef = db.collection("cities").doc("DC");
//
//// Atomically add a new region to the "regions" array field.
//washingtonRef.update({
//    regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
//});
//
//// Atomically remove a region from the "regions" array field.
//washingtonRef.update({
//    regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
//});