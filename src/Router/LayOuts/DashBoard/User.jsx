import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { TbMoodEmptyFilled } from 'react-icons/tb';

const User = () => {

    const [userStatus, setUserStatus] = useState('')
    const axiosSecure = useAxiosSecure();

    const { data: Users = [], refetch } = useQuery({
        queryKey: ['allUsers', userStatus],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers?status=${userStatus}`);
            return res.data;
        }
    })

    const [openForm, setOpenForm] = useState(false);
    const [userInfo, setuserInfo] = useState('');

    const handleViewUserForm = (User) => {
        setuserInfo(User)
        setOpenForm(true)
    }

    const handleStatusChange = (User, statusUp) => {
        axiosSecure.patch(`/allusers/${User._id}`, { statusUp })
            .then(res => {

                if (res.data.modifiedCount) {
                    refetch();
                    setOpenForm(false);
                    Swal.fire({
                        title: `${User.displayName.split(' ')[0]} is ${statusUp}`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                        customClass: {
                            confirmButton: "bg-white cursor-pointer text-black px-4 py-2 rounded font-semibold"
                        },
                        buttonsStyling: false
                    });
                }
            })
            .catch(err => {
                console.log(err)
            });
    }




    const handleApprove = (User) => {
        handleStatusChange(User, 'approved')
    }

    const hadleReject = (User) => {
        handleStatusChange(User, 'pending')
    }

    const handleSuspend = (User) => {
        handleStatusChange(User, 'suspended')
    }


    const handleUserStatus = (status) => {
        return setUserStatus(status)
    }




    return (
        <div>
            <h1 className='text-center text-3xl font-bold my-8'>All User Here</h1>
            <div className='flex justify-between items-center mb-3'>
                <p>Total users: ( {Users.length} )</p>
                <div className='flex gap-2'>
                    <button onClick={() => handleUserStatus('')} className={`px-3 py-1 ${userStatus === '' && 'border'} cursor-pointer`}>All</button>
                    <button onClick={() => handleUserStatus('approved')} className={`px-3 py-1 ${userStatus === 'approved' && 'border'} cursor-pointer`}>Approved</button>
                    <button onClick={() => handleUserStatus('pending')} className={`px-3 py-1 ${userStatus === 'pending' && 'border'} cursor-pointer`}>Pending</button>
                    <button onClick={() => handleUserStatus('suspended')} className={`px-3 py-1 ${userStatus === 'suspended' && 'border'} cursor-pointer`}>Suspended</button>
                </div>
            </div>

            <div>
                {Users.length !== 0 ? <table className="table">
                    <thead>
                        <tr className='text-gray-400'>
                            <th>#</th>
                            {/* <th>Avater</th> */}
                            <th>Name</th>
                            <th>Email</th>
                            
                            <th>Status</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Users.map((User, index) => <tr key={User?._id}>
                                <th>{index + 1}</th>
                                {/* <td><img className='h-14 w-20 rounded-xl' src={User?.photoURL} alt="Not Found" /></td> */}
                                <td>{User?.displayName}</td>
                                <td className='underline'><a href={`mailto:${User?.email}`}>{User?.email}</a></td>
                                
                                <td className={`${User?.status === 'approved' ? 'text-green-500' : User?.status === 'pending' ? 'text-yellow-500' : 'text-red-600'} font-semibold uppercase`}>{User?.status}</td>
                                <td className='uppercase'>{User?.role}</td>

                                <td>
                                    <button onClick={() => handleViewUserForm(User)} className={`btn btn-sm bg-transparent text-gray-400 border-2 rounded-[7px] border-gray-400`}>view</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table> : <div className="w-full h-[40vh] py-16 flex flex-col items-center justify-center text-center border border-dashed rounded-xl">

                    <p className='text-gray-400'><TbMoodEmptyFilled size={90} /></p>

                    <h3 className="mt-2 text-lg font-semibold">
                        No <span className='capitalize'>{userStatus}</span> User
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 max-w-sm">
                        Orders will appear here once customers place their purchases.
                    </p>
                </div>}

                <AnimatePresence>
                    {openForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed z-10 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setOpenForm(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
                            >


                                {/* form */}
                                <div className='flex flex-col items-center gap-3 text-gray-200'>
                                    <div className='w-25 h-25'>
                                        <img className='rounded-full h-full w-full' src={userInfo.photoURL} alt="" />
                                    </div>
                                    <p>Name: {userInfo.displayName}</p>
                                    <p>Email: {userInfo.email}</p>
                                    <p>{userInfo.displayName.split(' ')[0]}'s Role is: <span className='uppercase font-bold'>{userInfo.role}</span></p>
                                    <p>{userInfo.displayName.split(' ')[0]}'s Status is: <span className='font-bold uppercase'>{userInfo.status}</span></p>

                                </div>
                                {/* form end */}


                                <div className={`flex flex-col gap-4 mt-6`}>
                                    <div className='flex gap-4'>
                                        {
                                            userInfo?.status === 'approved'
                                                ? <button onClick={() => hadleReject(userInfo)} className='btn btn-warning text-black w-[48%]'>Reject</button>
                                                : <button onClick={() => handleApprove(userInfo)} className='btn btn-success text-black w-[48%]'>Approve</button>
                                        }

                                        <button onClick={() => handleSuspend(userInfo)} className='btn bg-red-600 hover:bg-red-700 text-white w-[48%]'>Suspend</button>
                                    </div>
                                    <button
                                        onClick={() => setOpenForm(false)}
                                        className="btn btn-warning bg-transparent  border-2 rounded-[7px]  hover:opacity-80"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default User;