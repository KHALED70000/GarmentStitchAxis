import React, { useEffect } from 'react';
import useAuth from '../../../HooKs/useAuth';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const ManageProduct = () => {
    const { user } = useAuth();


    useEffect(() => {
        document.title = "Manage-Product";
    }, []);


    const axiosSecure = useAxiosSecure();
    const { data: Products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user?.email}`);
            return res.data;
        }
    })


    return (
        <div>
            <h1 className='text-2xl font-bold text-center mt-4 mb-10'>Manage Your Products:</h1>
            <p className='my-4'>Available Produts: "{Products?.length}"</p>
            <div>
                <table className="table border border-gray-500">
                    {/* head */}
                    <thead>
                        <tr className='text-gray-400'>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Mode</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Products.map((Product, index) => <tr key={Product._id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className='w-22 h-15'>
                                    <img className='w-full h-full rounded-xl' src={Product.photos} alt="" />
                                </div>
                            </td>
                            <td>{Product.ProductName}</td>
                            <td>${Product.Price}</td>
                            <td>{Product.paymentOptions === 'payFirst' ? 'Pay First' : 'COD'}</td>
                            <td className='flex gap-2'>
                                <div className="flex gap-2">
                                    <NavLink to={`/Edit-Product/${Product._id}`} className="btn btn-sm bg-transparent border-2 border-blue-400 rounded-lg text-blue-400 hover:bg-blue-400/10">Edit</NavLink>

                                    <button className="btn btn-sm bg-transparent border-2 border-red-400 rounded-lg text-red-400 hover:bg-red-400/10"> Delete</button>
                                </div>

                                <NavLink to={`/View-Details/${Product._id}`} className='btn btn-sm bg-transparent border-2 border-gray-400 rounded-lg text-gray-400'>View</NavLink>
                            </td>
                        </tr>)}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageProduct;