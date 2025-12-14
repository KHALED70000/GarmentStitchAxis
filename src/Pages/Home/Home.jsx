import React, { useEffect } from 'react';
import Banner from './Banner';

const Home = () => {
     useEffect(() => {
    document.title = "NestCloth";
  }, []);
    return (
        <div>
            <h2 className='section-title'>Streamline Your Production Workflow</h2>
            <Banner />
        </div>
    );
};

export default Home;