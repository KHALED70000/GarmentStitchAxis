import React, { useState } from 'react';
import { AuthContext } from '../CONTEXT/AuthContext';

const AuthProvider = ({children}) => {
const [user, setUser] = useState(null)


    const authInfo ={
        setUser,
        user,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;