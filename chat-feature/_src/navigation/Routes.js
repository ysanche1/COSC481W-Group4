// HOLD ALL NAVIGATION STACKS FOR APP - ROUTES.JS
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//IMPORT STACHS
import DrawerNavigator from './DrawerNavigator';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import { firebase } from '../firebase/config';

//<DrawerNavigator />

export default function Routes() {
    //GET USER FROM AUTH CONTEXT 
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); //
    const [initializing, setInitializing] = useState(true); //

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
//        if (initializing) setInitializing(false);
//        setLoading(false);
    }
    
    useEffect(() => {
        const sub = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return sub; // unsubscribe on unmount
    }, []);
    
    
    ///LOADING SCREEN
    
  return (
    <NavigationContainer>
      {user ? <DrawerNavigator/> : <AuthStack/>}
      </NavigationContainer>
  );
}