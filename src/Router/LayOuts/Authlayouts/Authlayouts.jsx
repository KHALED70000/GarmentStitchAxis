import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../FixedLayOut/Nav';
import Footer from '../FixedLayOut/Footer';

const Authlayouts = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <main className='mt-20 mb-3 container mx-auto px-3'>
                <Outlet />
            </main>
            
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default Authlayouts;