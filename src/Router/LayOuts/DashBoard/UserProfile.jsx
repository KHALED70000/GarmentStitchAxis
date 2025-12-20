import React from 'react';
import useAuth from '../../../HooKs/useAuth';
import { IoCameraOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import useRole from '../../../HooKs/useRole';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const UserProfile = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuth()
    const { role } = useRole();
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                await logOut();
                Swal.fire({
                    title: 'Logged Out!',
                    text: 'You have successfully logged out.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate('/login'); // অথবা homepage
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Logout failed. Try again.',
                    icon: 'error'
                });
            }
        }
    };
    return (
        <div>
            <div className='flex justify-center items-center flex-col mb-6'>

                <div className='mt-6 relative w-50 h-50'>
                    <img className='rounded-full w-full h-full' src={user?.photoURL} alt="" />
                    <button className='p-2 bg-gray-900 rounded-full text-gray-400 absolute top-[80%] right-3'><IoCameraOutline size={30} /></button>
                </div>

                <div className='flex flex-col gap-2 my-6'>
                    <div>
                        <p className='text-xl font-semibold text-gray-400'>Your Role: <span className='capitalize'>{role}</span></p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <span className='text-xl font-semibold text-gray-400'>Name: </span>
                        <p>{user?.displayName}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <span className='text-xl font-semibold text-gray-400'>Email: </span>
                        <p>{user?.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="px-5 py-2 mb-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition"
                >
                    Logout
                </button>

                <div className='w-50'>
                    <button className='btn-donate w-full'>Update Profile</button>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;