import React, { useEffect } from 'react';
import Banner from './Banner';

const Home = () => {
     useEffect(() => {
    document.title = "NestCloth";
  }, []);
    return (
        <div>
            <Banner />
        </div>
    );
};

export default Home;