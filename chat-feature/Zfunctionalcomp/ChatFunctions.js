import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'

const SESSIONSFDB = 'SESSIONS';


//PULL TOP X MESSAGES DOWN FROM FB SESSION
function getMessages(SID) {
    const storedMessages = firestore()
        .collection(messagesFDB)
        .doc(SID)
        .orderby('createdAt')
        .limit(25);
    //idField:'id' ->  MESSAGE ID? -> MID
    return useCollectionData(storedMessages, {idField:'MID'});
}

//ADD MESSAGES TO SESSION STORAGE IN FB
function addMessages(uid, content) {
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