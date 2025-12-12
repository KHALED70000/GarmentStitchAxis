import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './FixedLayOut/Nav';

const Rootlayout = () => {
    return (
        <div>
            <header>
        <Navbar/>
            </header>

            <main>
                <Outlet/>
            </main>

            <footer>

            </footer>
        </div>
    );
};

export default Rootlayout;