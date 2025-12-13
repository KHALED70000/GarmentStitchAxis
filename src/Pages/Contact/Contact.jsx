import React, {  useEffect } from 'react';
import { AuthContext } from '../../CONTEXT/AuthContext';
import useAuth from '../../HooKs/useAuth';

const Contact = () => {
    const {setUser} = useAuth();
    useEffect(() => {
        setUser('Hellow')
    }, [setUser])
    return (
        <div>
            Contact page
        </div>
    );
};

export default Contact;