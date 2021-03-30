//WRAP ALL PROVIDERS HERE - PROVIDERS.JS
import React, { createContext, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './Routes';
export const AuthContext = createContext({});

export  function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
  return (
    <AuthContext.Provider value = {{ user, setUser }}>
        { children }
    </AuthContext.Provider>
  );
}