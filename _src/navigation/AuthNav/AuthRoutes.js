// HOLD ALL NAVIGATION STACKS FOR APP - ROUTES.JS
import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import auth from '@react-native-firebase/auth';
import { firebase } from '../../src/firebase/config';


//IMPORT STACHS
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

//CHECK IF USER IS LOGGED IN
import { AuthContext } from './AuthProvider';
//
import Loading from '../Zcomponents/Loading';

export default function Routes() {
    //GET USER FROM AUTH CONTEXT 
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); //
    const [initializing, setInitializing] = useState(true); //


    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
    }
    //??
    //subscribe to this state change function and make sure you unsubscribe it when the component unmounts
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
        {user ? <DrawerNavigator/> : <AuthStack/>}
        </NavigationContainer>
    );
}