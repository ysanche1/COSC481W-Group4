function loadConversations() {
    //GET USER SESSTION FROM AUTH CONTEXT USER .SESSIONS
}

import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'

const { user } = useContext(AuthContext);

const SESSIONSFDB = 'SESSIONS';
const CURRENTSESSION = storedMessages = firestore()
        .collection(messagesFDB)
        .doc(SID);

//PULL TOP X MESSAGES DOWN FROM FB SESSION
function getMessages(SID) {
    //USER -> SESSIONS -> SID -> ORDERBY.LIMIT
    const storedMessages = user.SESSIONS.find();
    //idField:'id' ->  MESSAGE ID? -> MID
    return useCollectionData(storedMessages, {idField:'MID'});
}

//ADD MESSAGES TO SESSION STORAGE IN FB
function addMessages(uid, content) {
    //USER -. SESSIONS -> MESSAGE -> 
    //if uid = this.uid (message on right)
    //
    
    const CURRENTSESSION = firestore()
        .collection(messagesFDB)
        .doc(SID);
    
    //CONNECT AUTHENTICATION HERE
    await CURRENTSESSION.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: {uid}.
      photoURL
    });
}