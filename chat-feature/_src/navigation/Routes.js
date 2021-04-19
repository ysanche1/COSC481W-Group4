// ROUTES.JS
// THIS FILE CONTAINS ALL THE STACKS FRO NAVIGATION OF ‘CHAT APP’ AND DECIDES WHICH STACK THE CURRENT USER CAN ACCESS. 
//MORGAN IVERSON

/************* NODE MODULES *************/
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

/************* LOCAL  COMPONENTS *************/
import DrawerNavigator from './DrawerNavigator';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import { firebase } from '../firebase/config';

/************* ROUTES *************/
export default function Routes() {
    //GET USER FROM AUTH CONTEXT 
    const { user, setUser } = useContext(AuthContext);

    //TELL IF SOMEONE IS LOGGED IN OR NOT
    function onAuthStateChanged(user) {
        setUser(user);
    }
    
    useEffect(() => {
        const sub = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return sub; // unsubscribe on unmount
    }, []);
        
  return (
    <NavigationContainer>
      {user ? <DrawerNavigator/> : <AuthStack/>}
      </NavigationContainer>
  );
}