import React, { createContext, useState } from 'react';

export const AuthContext = createContext({}); //ALLOWS REACT COMP TO RESPONT TO CONTEXT CHNAGES
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
            <AuthContext.Provider
      value={{user,setUser}}
    >
      {children}
    </AuthContext.Provider>
            
            );
}

//FUNCTIONS IN VLAUE PROP CAN BE USED ANYWHERE IN APP