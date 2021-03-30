import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//firebase.initializeApp({
//
//  apiKey: "AIzaSyAkSAaOCoQGMJ68eDks3sN4LdxFNrnYPGs",
//  authDomain: "myfirstchatapp-daa4a.firebaseapp.com",
//  projectId: "myfirstchatapp-daa4a",
//  storageBucket: "myfirstchatapp-daa4a.appspot.com",
//  messagingSenderId: "1012823270124",
//  appId: "1:1012823270124:web:6078e1bdf7c01057747bc9",
//
//});

export default function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )

}