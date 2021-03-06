// config.js 
// This file contains the object containing keys for firebase connection.
// Ben Bruursema


/************* NODE MODULES *************/
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/************* CONSTANTS *************/
const firebaseConfig = {
    apiKey: "AIzaSyB2IjXCJwgL37jS02VvKCfgaTKzzg91gLc",
    authDomain: "chatroom-b59c8.firebaseapp.com",
    databaseURL: "https://chatroom-b59c8-default-rtdb.firebaseio.com",
    projectId: "chatroom-b59c8",
    storageBucket: "chatroom-b59c8.appspot.com",
    messagingSenderId: "37535503320",
    appId: "1:37535503320:web:2c8c71774df51f7ccc18ad",
    measurementId: "G-S0ND30QQ8N"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

/************* EXPORTS *************/
export { firebase };