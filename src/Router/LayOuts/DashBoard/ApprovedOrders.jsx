import React, { useState } from 'react';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { SiTicktick } from "react-icons/si";
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { TbMoodEmptyFilled } from "react-icons/tb";



const ApprovedOrders = () => {
    const [openForm, setOpenForm] = useState(false);
    const [orderView, setOrderView] = useState();
    // const [orderStatus, setOrderStatus] = useState('pending')

    const axiosSecure = useAxiosSecure();
    const {
        data: orders,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['orders'], //orderStatus
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?status=approved`);
            return res.data;
        },
    });


    // const handlePendingOrderStatus = ()=>{
    //     setOrderStatus('pending')
    //     refetch();
    // }
    // const handleRejectgOrderStatus = ()=>{
    //     setOrderStatus('rejected')
    //     refetch();
    // }

    if (isLoading) {
        return (<div className="flex justify-center items-center h-screen">
            <span className="loading w-18 loading-spinner text-gray-400"></span>
        </div>)
    }


    const habdleActionOrder = (order, status) => {
        const isApprove = status === 'approved';

        Swal.fire({
            title: isApprove
                ? "Approve this order?"
                : "Reject this order?",
            text: isApprove
                ? "This action will mark the order as approved."
                : "This action will reject the order.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: isApprove ? "Approve" : "Reject",
            cancelButtonText: "Not yet",
            confirmButtonColor: isApprove ? "#16a34a" : "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/order?orderId=${order._id}&status=${status}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: isApprove
                                ? "Order Approved!"
                                : "Order Rejected!",
                            icon: "success",
                            timer: 1200,
                            showConfirmButton: false,
                            timerProgressBar: true,
                        });
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "Something went wrong!",
                            text: "Please try again.",
                            icon: "error",
                        });
                        console.error(err);
                    });
            }
        });
    };


    // const handleApprodeOrder = (order) => {
    //     habdleActionOrder(order, 'pending')
    // }
    const handleRejectOrder = (order) => {
        habdleActionOrder(order, 'pending')
    }




    const handelView = (order) => {
        setOpenForm(true);
        setOrderView(order)
    }

    // if (orders.length === 0) {
    //     return <>
    //         <div className="w-full h-[80vh] py-16 flex flex-col items-center justify-center text-center border border-dashed rounded-xl">
    //             <span className="text-sm uppercase tracking-widest text-gray-400">
    //                 Orders
    //             </span>
    //             <h3 className="mt-2 text-lg font-semibold">
    //                 No approded order here
    //             </h3>
    //             <p className="mt-1 text-sm text-gray-500 max-w-sm">
    //                 Orders will appear here once customers place their purchases.
    //             </p>
    //         </div>
    //     </>
    // }

    return (
        <div className=' scroll-auto'>
            <div>
                <h1 className='text-2xl font-bold text-center mt-4 mb-10'>Approved Order Here:</h1>
                <div className='flex justify-between my-4'>
                    <p className='my-3'>Toral Approved Orders: '{orders.length}'</p>
                    {/* <div className='flex gap-2'>
                        <button onClick={handlePendingOrderStatus} className={`px-5 rounded-[5px] cursor-pointer border-2 border-yellow-500 text-yellow-500 ${orderStatus === 'rejected' && 'scale-90'}`}>Pending Orders</button>
                        <button onClick={handleRejectgOrderStatus} className={`px-5 rounded-[5px] cursor-pointer border-2 border-red-500 text-red-700 ${orderStatus === 'pending' && 'scale-90'}`}>Rejected Orders</button>
                    </div> */}
                </div>
            </div>

            {orders.length !== 0 && <table className="table border border-gray-500">
                {/* head */}
                <thead>
                    <tr className='text-gray-400'>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Approved Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => <tr key={order._id}>
                            <th>{index + 1}</th>
                            <td>{order._id}</td>
                            <td>{order.FirstName} {order.LastName}</td>
                            <td>{order.ProductName}</td>
                            <td>{order.Order_Quantity} Pice</td>
                            <td >{order.approvedAt.slice(0, 10)}</td>
                            <td className={`${order.status === 'pending' ? 'text-warning' : order.status === 'rejected' ? 'text-red-600' : 'text-green-500'} capitalize`}>{order.status}</td>

                            <td>
                                <div className='flex gap-2'>
                                    {/* <button onClick={() => handleApprodeOrder(order)} className={`btn btn-sm bg-transparent text-green-500 border-2 rounded-[7px] border-green-500 `}>Pending</button> */}
                                    <button onClick={() => handleRejectOrder(order)} className={`btn btn-sm btn-warning bg-transparent  border-2 rounded-[7px]`}>Disapprove</button>
                                    <button onClick={() => handelView(order)} className={`btn btn-sm bg-transparent text-gray-400 border-2 rounded-[7px] border-gray-400`}>view</button>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table> || <div className="w-full h-[40vh] py-16 flex flex-col items-center justify-center text-center border border-dashed rounded-xl">

                <p className='text-gray-400'><TbMoodEmptyFilled size={90}/></p>
                   
                    <h3 className="mt-2 text-lg font-semibold">
                        No Approvede Orders
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
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
                        >


                            <div>
                                <div className='w-full h-50'>
                                    <img className='h-full w-full rounded-xl' src={orderView.ProductPhotos} alt="" />
                                </div>

                                <div className='flex flex-col gap-2 mt-6'>
                                    <p className='flex border-b justify-between text-gray-400'> <span className='font-bold'>Product Name: </span> <span>{orderView.ProductName}</span></p>
                                    <p className='flex border-b justify-between text-gray-400'> <span className='font-bold'> Quantity: </span> <span>{orderView.Order_Quantity}</span></p>
                                    <p className='flex border-b justify-between text-gray-400'> <span className='font-bold'>Order Price: </span> <span>{orderView.Product_pice} $</span></p>
                                    <p className='flex border-b justify-between text-gray-400'> <span className='font-bold'>Order status: </span> <span>{orderView.status}</span></p>
                                    <p className='flex border-b justify-between text-gray-400'> <span className='font-bold'>Date: </span> <span>{orderView.approvedAt.slice(0, 10)}</span></p>
                                    <p className='flex border-b justify-between text-gray-400'> <span className='font-bold'>Payment Mode: </span> <span>{orderView.ProductPaymentMode}</span></p>
                                    <p className='flex border-b justify-between text-gray-400'> <span className='font-bold'>Buyer Address: </span> <span className='max-w-60 text-justify'>{orderView.Buyer_Address}</span></p>
                                </div>
                            </div>

                            <div className='flex gap-3 justify-between mt-6'>
                                <NavLink to={`/Update-Tracking/${orderView._id}`} className='w-full text-center py-1 bg-transparent border-2 rounded-[7px] border-green-500 text-green-400'>Update Tracking</NavLink>
                                <NavLink className='w-full text-center py-1 bg-transparent border-2 rounded-[7px] border-gray-500 text-gray-400'>View Tracking</NavLink>
                            </div>

                            <div className={`flex flex-col gap-4 mt-6`}>
                                <button
                                    onClick={() => setOpenForm(false)}
                                    className=" p-2 bg-transparent border-2 rounded-full absolute -top-10 -right-10 hover:opacity-80"
                                >
                                    <RxCross2 size={30} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};

export default ApprovedOrders;