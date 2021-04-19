//AUTHPROVIDER.JS
// THIS FILE DEFINES THE CONTEXT WHICH TELLS THE APPLICATION IF THE CURRENT USER IS LOGGED IN OR NOT. 
// MORGAN IVERSON

/************* NODE MODULES *************/
import React, { createContext, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

/************* LOCAL  COMPONENTS *************/
import Routes from './Routes';
export const AuthContext = createContext({});

/************* AUTHENTICATION PROVIDER *************/
export  function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
  return (
    <AuthContext.Provider value = {{ user, setUser }}>
        { children }
    </AuthContext.Provider>
  );
}