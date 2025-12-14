import React, {  useEffect } from 'react';
import { AuthContext } from '../../CONTEXT/AuthContext';

const Contact = () => {
    useEffect(() => {
       document.title = "NestCloth | Contact";
     }, []);
    return (
        <div>
            Contact page
        </div>
    );
};

export default Contact;