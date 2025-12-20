import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../FixedLayOut/Footer";

const ManagerDashboardHome = () => {

      const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="text-center ">
                {/* Placeholder Icon / Emoji */}
                <div className="text-9xl animate-bounce">⚽</div>
                <div className="text-9xl h-2 rounded-full w-50 mx-auto bg-blue-400"></div>

                <h1 className="text-3xl font-bold  mt-6">Page Under Development</h1>
                <p className="mt-4 text-gray-400">
                    This page is currently being developed. Stay tuned for amazing features coming soon!
                </p>

                <button 
                    onClick={goBack} 
                    className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Go Back
                </button>
                <p className='my-4 text-xl font-bold'>Or</p>
                <div className='flex gap-4 flex-wrap justify-center'>
                    <Link className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition" to='/DashBoard/Add-Product'>Add Product</Link>
                    <Link className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition" to='/DashBoard/Manage-Product'>Manage Product</Link>
                    <Link className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition" to='/DashBoard/Pending-Orders'>Pending Orders</Link>
                    <Link className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition" to='/DashBoard/Approved-Orders'>Approvd Orders</Link>
                    <Link className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition" to='/DashBoard/User-Profile'>Profile</Link>
                </div>
            </div>
            <div className={`mt-10`}>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default ManagerDashboardHome;

