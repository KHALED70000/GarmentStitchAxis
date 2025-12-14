import React, { useEffect } from 'react';

const AboutUs = () => {
     useEffect(() => {
    document.title = "NestCloth | About Us";
  }, []);
    return (
        <div>
            About Us
        </div>
    );
};

export default AboutUs;