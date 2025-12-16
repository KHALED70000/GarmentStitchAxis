import React from 'react';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { SiTicktick } from "react-icons/si";


const PendingOrders = () => {
    const axiosSecure = useAxiosSecure();
    const {
        data: orders,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?status=pending`);
            return res.data;
        },
    });
    if (isLoading) {
        return (<div className="flex justify-center items-center h-screen">
            <span className="loading w-18 loading-spinner text-gray-400"></span>
        </div>)
    }

    const habdleActionOrder = (order, status) => {

        axiosSecure.patch(`/order?orderId=${order._id}&status=${status}`)
        .then(res=>{
            refetch();
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        });
    }

    const handleApprodeOrder = (order) => {
        habdleActionOrder(order, 'approved')
    }
    const handleDeleteOrder = (order) => {
        console.log('deleted')
    }

    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold text-center my-6'>New Order Here:</h1>
                <p className='my-3'>Toral Orders: '{orders.length}'</p>
            </div>

            <table className="table border border-gray-500">
                {/* head */}
                <thead>
                    <tr className='text-gray-400'>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Payment Mode</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => <tr key={order._id}>
                            <th>{index + 1}</th>
                            <td><img className='h-14 w-20 rounded-xl' src={order.ProductPhotos[0]} alt="Not Found" /></td>
                            <td>{order.ProductName}</td>
                            <td>{order.Order_Price} $</td>
                            <td className={`${order.ProductPaymentMode === 'cod' ? 'text-green-400' : 'text-warning'}`}>{order.ProductPaymentMode === 'payFirst' ? 'Pay First' : 'Cash on Delivery (COD)'}</td>
                            <td className={`text-${order.status === 'pending' ? 'warning' : 'green-500'} capitalize`}>{order.status}</td>

                            <td>
                                <div className='flex gap-2'>
                                    <button onClick={() => handleApprodeOrder(order)} className={`btn btn-sm bg-transparent text-green-500 border-2 rounded-[7px] border-green-500 `}>Approve</button>
                                    <button onClick={() => handleDeleteOrder(order)} className={`btn btn-sm btn-warning bg-transparent  border-2 rounded-[7px]`}>Delete</button>
                                    <button className={`btn btn-sm bg-transparent text-gray-400 border-2 rounded-[7px] border-gray-400`}>view</button>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PendingOrders;